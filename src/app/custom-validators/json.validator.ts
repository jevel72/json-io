import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidatorOutput } from '../types/validator-output.type';
import { ParsedUsers } from '../types/parsed-users.type';
import { User } from '../interfaces/user.interface';

const validationError: ValidationErrors = {
    jsonUserInvalid: true,
};

export const jsonUserValidator: ValidatorFn = (control: AbstractControl): ValidatorOutput => {
    try {
        const parsedJSON: ParsedUsers = JSON.parse(control.value);
        if (!(Array.isArray(parsedJSON))) throw new Error('Not array!');
        parsedJSON.forEach((user: User) => {
            if (
                Object.is(user, null) ||
                !(Reflect.has(user, 'name')) ||
                !(Reflect.has(user, 'year')) ||
                !(typeof user.name === 'string') ||
                !(!(isNaN(+user.year))) ||
                !(+user.year < 2021) ||
                !(+user.year > 1895) ||
                !(user.name.length > 1)
            ) {
                throw new Error('Object fields is wrong!');
            }
        });
    } catch(e: unknown) {
        return validationError;
    }
    return null;
};