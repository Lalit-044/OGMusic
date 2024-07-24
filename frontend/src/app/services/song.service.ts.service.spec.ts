import { TestBed } from '@angular/core/testing';

import { SongServiceTsService } from './song.service.ts.service';

describe('SongServiceTsService', () => {
  let service: SongServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
