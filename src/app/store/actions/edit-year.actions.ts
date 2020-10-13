import { createAction, props } from '@ngrx/store';

import { EditYearMetadata } from '../../interfaces/edit-year-metadata.interface';

export const editYear = createAction('[JSON Output] Edit', props<{ payload: EditYearMetadata }>());