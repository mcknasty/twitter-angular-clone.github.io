import { TestBed, inject } from '@angular/core/testing';
import { declarations } from '../declarations';
import { imports } from '../imports';
import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({declarations, imports}));

  it('The message service should be dependancy injected', inject([MessageService], (service: MessageService) => {
    expect(service).toBeDefined();
  }));

  it('The message service should add a message', inject([MessageService], (service: MessageService) => {
    expect(service).toBeDefined();
    service.add(`Hello world, it's me and I am ok!`);
    let messages = service.getMessages();
    expect(messages).toHaveSize(1);
    expect(messages[0]).toBe(`Hello world, it's me and I am ok!`)
    service.clear();
  }));

  it('The message service should be able to clear all messages', inject([MessageService], (service: MessageService) => {
    expect(service).toBeDefined();
    service.add(`Hello world, it's me and I am ok!`);
    let messages = service.getMessages();
    expect(messages).toHaveSize(1);
    service.clear();
    messages = service.getMessages();
    expect(messages).toHaveSize(0);
  }));

});
