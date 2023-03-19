import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Message } from '../interfaces/wires.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionMessageService {
  private SESSION_MESSAGES_KEY = 'session_messages';

  private messagesSubject$ = new BehaviorSubject<Message[]>(
    this.loadMessages()
  );

  public messages$ = this.messagesSubject$.asObservable();
  public messagesCount$ = this.messages$.pipe(
    map((messages) => messages.length)
  );

  public constructor() {}

  public loadMessages(): Message[] {
    const rawMessages = localStorage.getItem(this.SESSION_MESSAGES_KEY) || '[]';
    const messages: Message[] = JSON.parse(rawMessages);
    return messages;
  }

  public cleanMessages(): void {
    localStorage.removeItem(this.SESSION_MESSAGES_KEY);
    this.messagesSubject$.next([]);
  }

  /**
   * Save message as session message.
   *
   * Session messages live while the session is active.
   * Once the session is destroyed, the session messages are removed.
   * @param {Message} message
   */
  public saveMessage(message: Message): void {
    // Get current messages.
    // If item does not exists get an empty array.
    const messages = this.loadMessages();
    // Push new message.
    const updatedMessages = [...messages, message];
    // Save message.
    this.messagesSubject$.next(updatedMessages);
    localStorage.setItem(
      this.SESSION_MESSAGES_KEY,
      JSON.stringify(updatedMessages)
    );
  }
}
