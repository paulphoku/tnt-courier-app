import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnPage } from './conn.page';

describe('ConnPage', () => {
  let component: ConnPage;
  let fixture: ComponentFixture<ConnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
