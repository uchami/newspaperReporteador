import { TestBed, inject } from '@angular/core/testing';

import { ReadRepartoFileService } from './read-reparto-file.service';

describe('ReadRepartoFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadRepartoFileService]
    });
  });

  it('should be created', inject([ReadRepartoFileService], (service: ReadRepartoFileService) => {
    expect(service).toBeTruthy();
  }));
});
