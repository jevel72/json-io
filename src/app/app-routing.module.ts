import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { JsonOutputComponent } from './components/json-output/json-output.component';
import { InsertJsonComponent } from './components/insert-json/insert-json.component';
import { EditJsonComponent } from './components/edit-json/edit-json.component';
import { CopyJsonComponent } from './components/copy-json/copy-json.component';
import { NewJsonComponent } from './components/new-json/new-json.component';

const JsonOutputRoute: Route = {
    path: 'output',
    component: JsonOutputComponent,
};

const EditJsonRoute: Route = {
    path: 'edit',
    component: EditJsonComponent,
};

const CopyJsonRoute: Route = {
    path: 'copy',
    component: CopyJsonComponent,
};

const NewJsonRoute: Route = {
    path: 'new',
    component: NewJsonComponent,
};

const InsertJsonRoute: Route = {
    path: '',
    pathMatch: 'full',
    component: InsertJsonComponent,
};

const routes: Routes = [
    JsonOutputRoute,
    EditJsonRoute,
    CopyJsonRoute,
    NewJsonRoute,
    InsertJsonRoute,
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}