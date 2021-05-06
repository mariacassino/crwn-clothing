const INITIAL_STATE = {
    currentUser: null
}

// if state is ever undefined, it'll use initial state value as default
const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // when SET_CURRENT_USER is action type that gets fired, return everything else from state and set currentUser to payload
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;