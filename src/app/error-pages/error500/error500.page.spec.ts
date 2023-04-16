import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error500Page } from './error500.page';

describe('Error500Page', () => {
  let component: Error500Page;
  let fixture: ComponentFixture<Error500Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Error500Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
