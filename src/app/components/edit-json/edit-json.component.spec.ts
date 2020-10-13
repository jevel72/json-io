import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJsonComponent } from './edit-json.component';

describe('EditJsonComponent', () => {
  let component: EditJsonComponent;
  let fixture: ComponentFixture<EditJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
