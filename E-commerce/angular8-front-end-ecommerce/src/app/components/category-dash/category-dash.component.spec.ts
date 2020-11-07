import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDashComponent } from './category-dash.component';

describe('CategoryDashComponent', () => {
  let component: CategoryDashComponent;
  let fixture: ComponentFixture<CategoryDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
