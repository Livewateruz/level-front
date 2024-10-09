import { createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';

const rawCookieData = Cookies.get('data');
const initialState = {
    accsessToken: Cookies.get('accsessToken') || false,
    refreshToken: Cookies.get('refreshToken') || false,
    user: rawCookieData ? JSON.parse(rawCookieData) : false,
    role :  "admin"
};

const dataConfigSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setToken (state, { payload }) {
            const expirationTime = 7 * 24 * 60 * 60 * 1000;
            const expirationDate = new Date(Date.now() + expirationTime);
            Cookies.set('accsessToken', payload.accsessToken, { path: '/', expires: expirationDate });
            state.accsessToken = payload.accsessToken;
            Cookies.set('refreshToken', payload.refreshToken, { path: '/', expires: expirationDate });
            state.refreshToken = payload.refreshToken;
        },
        setUser (state, { payload }) {
            state.user = payload.user;
        },
        setRole (state, { payload }) {
            state.role = payload.role;
        }
    }
});

export const { setUser, setToken ,setRole} = dataConfigSlice.actions;

export default dataConfigSlice.reducer;
