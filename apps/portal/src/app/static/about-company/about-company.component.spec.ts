import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutCompanyComponent } from './about-company.component';

describe('AboutCompanyComponent', () => {
  let component: AboutCompanyComponent;
  let fixture: ComponentFixture<AboutCompanyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
