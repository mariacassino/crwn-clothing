import { createSelector } from "reselect";

// input selector
const selectUser = state => state.user;

// export selector
export const selectCurrentUser = createSelector(
    // first arg is array of input selectors
    [selectUser],
    // second arg is function that will return the value we want out of the selectors
    user => user.currentUser
);