import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public constructor() {}

  public debug(message: any): void {
    console.log('DEBUG:', message);
  }

  public error(message: any): void {
    console.error('ERROR:', message);
  }
}
