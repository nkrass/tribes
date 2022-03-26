import { TestBed, waitForAsync } from '@angular/core/testing';

import { StorageModule } from './storage.module';

describe('StorageModule', () => {
  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      imports: [StorageModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StorageModule).toBeTruthy();
  });
});