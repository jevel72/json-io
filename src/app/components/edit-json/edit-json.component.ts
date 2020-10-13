import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SubscriptionLike } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { editUser } from '../../store/actions/edit-user.actions';

import { Users } from '../../types/users.type';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-edit-json',
  templateUrl: './edit-json.component.html',
  styleUrls: ['./edit-json.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditJsonComponent implements OnInit, OnDestroy {

  constructor(
    private readonly title: Title,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Edit JSON');
    this.queryParams = this.route.queryParams.pipe(map(params => params.id)).subscribe(id => this.id = id);
    this.userSubscription = this.store.pipe(select(state => state.users)).subscribe((users: Users) => {
      this.user = users.filter((user: User, index: number) => index === +this.id)[0];
    });
    this.editForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(2)]],
      year: [this.user.year, [Validators.required, Validators.min(1895), Validators.max(2020)]],
    });
  }

  ngOnDestroy(): void {
    this.queryParams.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  public queryParams: SubscriptionLike;

  public id: number;

  public editForm: FormGroup;

  public userSubscription: SubscriptionLike;

  public user: User;

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

}
