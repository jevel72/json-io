import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyJsonComponent } from './copy-json.component';

describe('CopyJsonComponent', () => {
  let component: CopyJsonComponent;
  let fixture: ComponentFixture<CopyJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyJsonComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change value in property "copy"', (done: DoneFn) => {
    component.onCopy();
    expect(component.copy).toBe('copied!');
  });

});
