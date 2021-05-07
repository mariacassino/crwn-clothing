// imports the action that sets 'SET_CURRENT_USER' to a constant instead of a string
import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})