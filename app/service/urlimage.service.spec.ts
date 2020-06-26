import { TestBed } from '@angular/core/testing';

import { UrlimageService } from './urlimage.service';

describe('UrlimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlimageService = TestBed.get(UrlimageService);
    expect(service).toBeTruthy();
  });
});
