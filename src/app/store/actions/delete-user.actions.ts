import { createAction, props } from '@ngrx/store';

export const deleteUser = createAction(
    '[JSON Output] Delete',
    props<{ payload: { id: number }}>()
);