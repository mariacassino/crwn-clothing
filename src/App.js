import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx'

import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {
  /* we have to unsubscribe when we unmount */
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

      setCurrentUser(userAuth);
      /* collectionsArray holds values we don't want in our db, such as routeName and id (bc we're asking Firebase to 
      generate them for us), so instead of passing full array, we're gonna pass in a new array where we get the 
      object and destructure off of it just the properties we want (the `title` and `items`), 
      and then we'll return a new object  */
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
    });
  }

  componentWillUnmount () {
      /* we have to unsubscribe when we unmount */
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => 
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
              )
            } 
          />
        </Switch>
      </div>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

/* 
function that gets dispatch property, & returns an object where 
the prop name is whatever prop we wanna pass in that dispatches the action (SET_CURRENT_USER) 
*/
const mapDispatchToProps = dispatch => ({
  /* 
    setCurrentUser goes to a function that get a user object and calls dispatch
    dispatch is a way for redux to indicate that whatever it's passed is an action object that will be 
    passed to every reducer  
  */
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


/*
connect map to outcome of initial connect call
first arg is null bc we don't need any states or props from reducer
*/
export default connect(mapStateToProps, mapDispatchToProps)(App);
