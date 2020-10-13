import { createAction, props } from '@ngrx/store';

import { EditNameMetadata } from 'src/app/interfaces/edit-name-metadata.interface';

export const editName = createAction('[JSON Output] Edit Name', props<{ payload: EditNameMetadata }>());