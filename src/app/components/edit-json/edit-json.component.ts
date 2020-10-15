import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SubscriptionLike } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { editUser } from '../../store/actions/edit-user.actions';

import { Users } from '../../types/users.type';
import { Controls } from 'src/app/types/controls.type';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-edit-json',
  templateUrl: './edit-json.component.html',
  styleUrls: ['./edit-json.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditJsonComponent implements OnInit, OnDestroy {
  
  public queryParams: SubscriptionLike;
  
  public userSubscription: SubscriptionLike;

  public editForm: FormGroup;

  
  public id: number;
  
  public user: User;

  private _controls: Controls;

  constructor(
    private readonly title: Title,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly store: Store<any>,
  ) { }

  public ngOnInit(): void {
    this._setUpTitle();
    this._setUpQueryParams();
    this._setUpUserSubscription();
    this._setUpForm();
    this._setUpControls();
  }

  public ngOnDestroy(): void {
    this.queryParams.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  public onSave(): void {
    this.store.dispatch(editUser({
      payload: {
        id: this.id,
        name: this.editForm.controls['name'].value,
        year: +this.editForm.controls['year'].value,
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
    this.title.setTitle('Edit JSON');
  }

  private _setUpQueryParams(): void {
    this.queryParams = this.route.queryParams.pipe(map(params => params.id)).subscribe(id => this.id = id);
  }

  private _setUpUserSubscription(): void {
    this.userSubscription = this.store.pipe(select(state => state.users)).subscribe((users: Users) => {
      this.user = users.filter((user: User, index: number) => index === +this.id)[0];
    });
  }
  
  private _setUpForm(): void {
    this.editForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-zА-Яа-я ]*$/)]],
      year: [this.user.year, [Validators.required, Validators.min(1895), Validators.max(2020)]],
    });
  }

  private _setUpControls(): void {
    this._controls = this.editForm.controls;
  }

}
