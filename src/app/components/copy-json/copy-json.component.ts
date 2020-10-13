import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import { Users } from '../../types/users.type';

@Component({
  selector: 'app-copy-json',
  templateUrl: './copy-json.component.html',
  styleUrls: ['./copy-json.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyJsonComponent implements OnInit {

  constructor(
    private readonly store: Store<any>,
    private readonly title: Title,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Copy JSON');
    this.users$ = this.store.pipe(select(state => state.users));
  }

  public users$: Observable<Users>;

  public copy: string = 'Copy';

  public onCopy(): void {
    this.copy = 'Copied!';
    setTimeout(() => {
      this.copy = 'Copy';
      this.cdr.detectChanges();
    }, 3000);
  }

}
