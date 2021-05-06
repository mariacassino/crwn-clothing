import React from 'react';
import {Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import { setCurrentUser } from './redux/user/user.actions'


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth );
    });
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
      );
  }
}

// function that gets dispatch property, & returns an object where 
  //the prop name is whatever prop we wanna pass in that dispatches the action (SET_CURRENT_USER)
const mapDispatchToProps = dispatch => ({
  // setCurrentUser goes to a function that get a user object and calls dispatch
  // dispatch is a way for redux to indicate that whatever it's passed is an action object that will be 
    // passed to every reducer  
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


// connect map to outcome of initial connect call
// first arg is null bc we don't need any states or props from reducer
export default connect(null, mapDispatchToProps)(App);
