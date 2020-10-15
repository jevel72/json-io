import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJsonComponent } from './new-json.component';

describe('NewJsonComponent', () => {
  let component: NewJsonComponent;
  let fixture: ComponentFixture<NewJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
