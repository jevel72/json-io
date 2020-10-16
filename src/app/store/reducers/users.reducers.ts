import { createReducer, on } from '@ngrx/store';

import { insertJson } from '../actions/insert-json.actions';
import { deleteUser } from '../actions/delete-user.actions';
import { addUser } from '../actions/add-user.actions';
import { editYear } from '../actions/edit-year.actions';
import { editName } from '../actions/edit-name.actions';
import { editUser } from '../actions/edit-user.actions';

import { Users } from '../../types/users.type';
import { User } from '../../interfaces/user.interface';

import { NAME_PATTERN } from '../../patterns/name.pattern';

let initialState: Users;

try {
    const parsedJSON: Users = JSON.parse((window.localStorage as Storage).getItem('users'));
    if (!(Array.isArray(parsedJSON))) throw new Error('This is NOT array!');
    parsedJSON.forEach((user: User) => {
        if (
            Object.is(user, null) ||
                !(Reflect.has(user, 'name')) ||
                !(Reflect.has(user, 'year')) ||
                !(typeof user.name === 'string') ||
                !(!(isNaN(+user.year))) ||
                !(+user.year < 2021) ||
                !(+user.year > 1895) ||
                !(user.name.length > 1) ||
                !(NAME_PATTERN.test(user.name))
        ) {
            throw new Error('Object fields is wrong!');
        }
    });
    initialState = parsedJSON;
} catch(e: unknown) {
    (window.localStorage as Storage).setItem('users', '[]');
    initialState = [];
}

const _usersReducer = createReducer(initialState, 
    on(insertJson, (state: Users, { payload }): Users => ([
        ...payload
    ])),
    on(deleteUser, (state: Users, { payload }): Users => {
        const newState: Users = [...state.filter((user: User, index: number) => index !== payload.id)];
        window.localStorage.setItem('users', JSON.stringify(newState));
        return newState;
    }),
    on(addUser, (state: Users, { payload }): Users => {
        const newUser: User = {
            name: payload.name,
            year: payload.year,
        };
        const newState: Users = [...state.concat({ ...newUser })];
        window.localStorage.setItem('users', JSON.stringify(newState));
        return newState;
    }),
    on(editYear, (state: Users, { payload }): Users => {
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
    on(editName, (state: Users, { payload }): Users => {
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
    on(editUser, (state: Users, { payload }): Users => {
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