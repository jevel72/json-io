import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import { LOCAL_STORAGE_TOKEN } from '../../tokens/local-storage.token';

import { editYear } from '../../store/actions/edit-year.actions';
import { editName } from '../../store/actions/edit-name.actions';
import { deleteUser } from '../../store/actions/delete-user.actions';

import { EditYearMetadata } from '../../interfaces/edit-year-metadata.interface';
import { EditNameMetadata } from '../../interfaces/edit-name-metadata.interface';
import { Users } from '../../types/users.type';

import { NAME_PATTERN } from 'src/app/patterns/name.pattern';

@Component({
  selector: 'app-json-output',
  templateUrl: './json-output.component.html',
  styleUrls: ['./json-output.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonOutputComponent implements OnInit {
  
  public users$: Observable<Users>;

  public row: number = -1;

  constructor(
    @Inject(LOCAL_STORAGE_TOKEN) private readonly localStorage: Storage,
    private readonly title: Title,
    private readonly store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('JSON Output');
    this.users$ = this.store.pipe(select(state => state.users));
  }

  public editYear(ev: Event, id: number): void {
    ev.preventDefault();
    if (isNaN(+(ev.target as HTMLElement).innerText)) return;
    const year: number = +(ev.target as HTMLElement).innerText;
    if (year > 2020 || year < 1895) return;
    const payload: EditYearMetadata = {
      id,
      year,
    };
    this.store.dispatch(editYear({ payload }));
  }

  public editName(ev: Event, id: number): void {
    ev.preventDefault();
    const name: string = (ev.target as HTMLElement).innerText;
    if (name.length < 2) return;
    if (!(NAME_PATTERN.test(name))) return;
    const payload: EditNameMetadata = {
      id,
      name,
    };
    this.store.dispatch(editName({ payload }));
  }

  public setChangedRow(index: number): void {
    if (index === this.row) {
      this.row = -1;
      return;
    }
    this.row = index;
  }

  public deleteEntity(index: number): void {
    this.store.dispatch(deleteUser({ payload: { id: index }} ));
  }

}
