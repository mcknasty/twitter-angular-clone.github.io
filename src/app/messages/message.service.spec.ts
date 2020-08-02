import { TestBed, inject } from '@angular/core/testing';
import { declarations } from '../declarations';
import { imports } from '../imports';
import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({declarations, imports}));

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
