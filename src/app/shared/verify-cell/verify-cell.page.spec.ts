import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyCellPage } from './verify-cell.page';

describe('VerifyCellPage', () => {
  let component: VerifyCellPage;
  let fixture: ComponentFixture<VerifyCellPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerifyCellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
