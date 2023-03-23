import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap, catchError, filter } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import {
  CreateMessageDto,
  Message,
  MessagesFilters,
} from '../interfaces/wires.interface';
import { SessionMessageService } from './session-message.service';

@Injectable({
  providedIn: 'root',
})
export class WiresService {
  private messageCreationSubject$ = new Subject<void>();
  public messageCreation$ = this.messageCreationSubject$.asObservable();

  private authorizationHeader = '';

  public constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private sessionMessagesService: SessionMessageService
  ) {
    this.authService.auth$.subscribe((auth) => {
      this.authorizationHeader = `Bearer ${auth!.access_token}`;
    });
  }

  public notifyMessageCreation(): void {
    this.messageCreationSubject$.next();
  }

  public getAllMessages(): Observable<Message[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      this.authorizationHeader
    );
    const endpoint = `${environment.API_BASE_URL}/messages`;
    return this.httpClient.get<Message[]>(endpoint, { headers });
  }

  public getFilteredMessages(filters: MessagesFilters): Observable<Message[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      this.authorizationHeader
    );
    const endpoint = `${environment.API_BASE_URL}/messages/find`;
    return this.httpClient
      .post<Message[]>(endpoint, filters, { headers })
      .pipe(catchError((_) => of<Message[]>([])));
  }

  public getMyMessages(): Observable<Message[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      this.authorizationHeader
    );
    const endpoint = `${environment.API_BASE_URL}/messages/me`;
    return this.httpClient.get<Message[]>(endpoint, { headers });
  }

  public createMessage(
    createMessageDto: CreateMessageDto
  ): Observable<Message> {
    const headers = new HttpHeaders().set(
      'Authorization',
      this.authorizationHeader
    );
    const endpoint = `${environment.API_BASE_URL}/messages`;
    return this.httpClient
      .post<Message>(endpoint, createMessageDto, {
        headers,
      })
      .pipe(
        tap((message) => {
          this.sessionMessagesService.saveMessage(message);
        })
      );
  }
}
