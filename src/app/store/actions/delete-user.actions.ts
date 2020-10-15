import { createAction, props } from '@ngrx/store';

import { Index } from '../../interfaces/index.interface';

export const deleteUser = createAction(
    '[JSON Output] Delete',
    props<{ payload: Index }>()
);