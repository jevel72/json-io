import { createAction, ActionCreator, props } from '@ngrx/store';

import { Users } from '../../types/users.type';

export const insertJson = createAction('[JSON Input Page] Insert Data', props<{ payload: Users}>());