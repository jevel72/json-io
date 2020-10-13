import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { InsertJsonComponent } from './components/insert-json/insert-json.component';
import { JsonOutputComponent } from './components/json-output/json-output.component';

import { usersReducer } from './store/reducers/users.reducers';
import { EditJsonComponent } from './components/edit-json/edit-json.component';
import { CopyJsonComponent } from './components/copy-json/copy-json.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertJsonComponent,
    JsonOutputComponent,
    EditJsonComponent,
    CopyJsonComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ClipboardModule,
    AppRoutingModule,
    StoreModule.forRoot({ users: usersReducer }, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
