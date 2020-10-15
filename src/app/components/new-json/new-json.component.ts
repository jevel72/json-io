import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { addUser } from '../../store/actions/add-user.actions';

import { Controls } from 'src/app/types/controls.type';

import { NAME_PATTERN } from 'src/app/patterns/name.pattern';

@Component({
  selector: 'app-new-json',
  templateUrl: './new-json.component.html',
  styleUrls: ['./new-json.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewJsonComponent implements OnInit {

  public addForm: FormGroup;

  private _controls: Controls;

  constructor(
    private readonly title: Title,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly store: Store<any>,
  ) { }

  public ngOnInit(): void {
    this._setUpTitle();
    this._setUpForm();
    this._setUpControls();
  }

  public onAdd(): void {
    this.store.dispatch(addUser({
      payload: {
        name: this.addForm.controls['name'].value,
        year: +this.addForm.controls['year'].value,
      }
    }));
    this.router.navigateByUrl('/output');
  }
  
  public get minlengthNameError(): boolean {
    return this._controls['name'].hasError('minlength');
  }

  public get requiredNameError(): boolean {
    return this._controls['name'].hasError('required');
  }

  public get patternNameError(): boolean {
    return this._controls['name'].hasError('pattern');
  }

  public get minmaxYearError(): boolean {
    return this._controls['year'].hasError('min') || this._controls['year'].hasError('max');
  }

  public get requiredYearError(): boolean {
    return this._controls['year'].hasError('required');
  }

  private _setUpTitle(): void {
    this.title.setTitle('New JSON');
  }

  private _setUpForm(): void {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)]],
      year: ['', [Validators.required, Validators.min(1895), Validators.max(2020)]],
    });
  }

  private _setUpControls(): void {
    this._controls = this.addForm.controls;
  }

}
