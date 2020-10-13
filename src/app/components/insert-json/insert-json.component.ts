import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { LOCAL_STORAGE_TOKEN } from 'src/app/tokens/local-storage.token';

import { jsonUserValidator } from '../../custom-validators/json.validator';

import { insertJson } from '../../store/actions/insert-json.actions';

@Component({
  selector: 'app-insert-json',
  templateUrl: './insert-json.component.html',
  styleUrls: ['./insert-json.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertJsonComponent implements OnInit {

  public constructor(
    @Inject(LOCAL_STORAGE_TOKEN) private readonly localStorage: Storage,
    private readonly title: Title,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  public ngOnInit(): void {
    this.title.setTitle('Insert JSON');
    this.dataInput = this.fb.control('', [Validators.required, jsonUserValidator]);
    if ('users' in this.localStorage) {
      this.dataInput.setValue(this.localStorage.getItem('users'), { emitModelToViewChange: true });
    }
  }

  public dataInput: FormControl;

  public readonly placeholderText: string = 'enter json string with "name" and "year" fields';

  public get requiredError(): boolean {
    return this.dataInput.hasError('required') && this.dataInput.touched;
  }

  public get wrongJsonError(): boolean {
    return this.dataInput.hasError('jsonUserInvalid') && this.dataInput.dirty && !this.requiredError;
  }

  public get disabled(): boolean {
    return this.dataInput.value === '' || this.requiredError || this.wrongJsonError;
  }

  public addSampleJson(): void {
    this.dataInput.setValue(JSON.stringify([{ name: 'Cliff', year: '1961' }], null, 2), { emitModelToViewChange: true });
  }

  public handleContinue(): void {
    this.localStorage.setItem('users', this.dataInput.value);
    this.store.dispatch(insertJson({ payload: JSON.parse(this.dataInput.value) }));
    this.router.navigateByUrl('/output');
  }
}
