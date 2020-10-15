import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/interfaces/user.interface';

export const addUser = createAction('[New JSON] Add', props<{ payload: User }>());