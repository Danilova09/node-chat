import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, interval, map, Subject, tap } from 'rxjs';
import { Message, MessageData } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  messagesChange = new Subject<Message[]>();
  fetchingMessages = new Subject<boolean>();
  postingMessage = new Subject<boolean>();
  messagesInterval = interval(2000);
  lastDatetime = '';

  constructor(
    private http: HttpClient,
  ) {}

  fetchMessages() {
    this.fetchingMessages.next(true);
    this.http.get<Message[]>('http://localhost:5000/messages').pipe(
      map(messages => {
        if (messages.length > 0) {
          this.fetchingMessages.next(false);
          this.lastDatetime = messages[0].datetime;
          return messages.map(message => {
            return new Message(message.id, message.author, message.message, message.datetime);
          });
        }
        return this.messages;
      })).subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.messagesChange.next(messages);
      },
      error: (error) => console.log(error),
    });
  }

  startMessagesInterval() {
    this.fetchMessages();
    this.messagesInterval.subscribe(() => {
      this.http.get<Message[]>(`http://localhost:5000/messages?datetime=${this.lastDatetime}`).pipe(
        tap((messages) => {
          if (messages.length > 0) {
            this.fetchMessages();
          }
          return EMPTY;
        })
      ).subscribe({
        error: (error) => console.log(error),
      });
    });
  }

  postMessage(message: MessageData) {
    this.postingMessage.next(true);
    this.http.post('http://localhost:5000/messages', message)
      .subscribe({
        next: () => this.postingMessage.next(false),
        error: () => this.postingMessage.next(false)
      });
  }
}
