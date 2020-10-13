import { createAction, props } from '@ngrx/store';

import { EditUserMetadata } from '../../interfaces/edit-user-metadata.interface';

export const editUser = createAction('[Edit User] Edit', props<{ payload: EditUserMetadata }>());