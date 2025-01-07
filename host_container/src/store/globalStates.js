import {atom} from 'jotai';

const initailremotesData = {
    activeRemotes: null,
};

const initailPageDetails = {
    isLoggedIn: false,
};

export const remotesData = atom(initailremotesData);
export const pageDetails = atom(initailPageDetails);