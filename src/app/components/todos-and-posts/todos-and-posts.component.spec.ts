import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosAndPostsComponent } from './todos-and-posts.component';

describe('TodosAndPostsComponent', () => {
  let component: TodosAndPostsComponent;
  let fixture: ComponentFixture<TodosAndPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosAndPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosAndPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
