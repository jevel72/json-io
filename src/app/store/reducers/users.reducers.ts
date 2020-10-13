import { createReducer, on } from '@ngrx/store';

import { insertJson } from '../actions/insert-json.actions';
import { editYear } from '../actions/edit-year.actions';
import { editName } from '../actions/edit-name.actions';
import { editUser } from '../actions/edit-user.actions';

import { Users } from '../../types/users.type';
import { User } from '../../interfaces/user.interface';

const initialState: Users = JSON.parse(window.localStorage.getItem('users')) || [];

const _usersReducer = createReducer(initialState, 
    on(insertJson, (state: Users, { payload }) => ([
        ...payload
    ])),
    on(editYear, (state: Users, { payload }) => {
        const newState: Users = [
            ...state.map((user: User, index: number) => {
                if (index === payload.id) {
                    return {
                        ...user,
                        year: payload.year,
                    };
                } else {
                    return user;
                }
            }),
        ];
        window.localStorage.setItem('users', JSON.stringify(newState));
        return newState;
    }),
    on(editName, (state: Users, { payload }) => {
        const newState: Users = [
            ...state.map((user: User, index: number) => {
                if (index === payload.id) {
                    return {
                        ...user,
                        name: payload.name,
                    };
                } else {
                    return user;
                }
            }),
        ];
        window.localStorage.setItem('users', JSON.stringify(newState));
        return newState;
    }),
    on(editUser, (state: Users, { payload }) => {
        const newState: Users = [
            ...state.map((user: User, index: number) => {
                if (index === +payload.id) {
                    return {
                        name: payload.name,
                        year: payload.year,
                    };
                } else {
                    return user;
                }
            }),
        ];
        window.localStorage.setItem('users', JSON.stringify(newState));
        return newState;
    }),
);

export function usersReducer(state: Users, action) {
    return _usersReducer(state, action);
}