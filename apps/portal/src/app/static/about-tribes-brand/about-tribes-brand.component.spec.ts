import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutTribesBrandComponent } from './about-tribes-brand.component';

describe('AboutTribesBrandComponent', () => {
  let component: AboutTribesBrandComponent;
  let fixture: ComponentFixture<AboutTribesBrandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTribesBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTribesBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
