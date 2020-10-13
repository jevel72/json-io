import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertJsonComponent } from './insert-json.component';

describe('InsertJsonComponent', () => {
  let component: InsertJsonComponent;
  let fixture: ComponentFixture<InsertJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
