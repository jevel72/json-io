import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE_TOKEN = new InjectionToken('LocalStorage', {
    providedIn: 'root',
    factory: () => window.localStorage
});