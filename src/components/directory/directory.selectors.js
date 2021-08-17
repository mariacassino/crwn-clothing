import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
    /* first arg is array of input selectors */
    [selectDirectory],
    /* second arg is function that will return the value we want out of the selectors */
    directory => directory.sections
);

