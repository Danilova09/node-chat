import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Message, MessageData } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(
    private http: HttpClient,
  ) { }

  getMessages() {
    this.http.get<Message[]>('http://localhost:5000/messages').pipe(
      map(result => {
        console.log(result);
      })).subscribe();
  }

  addMessage(message: MessageData) {
    this.http.post('http://localhost:5000/messages', message).subscribe(result => {
      console.log(result);
    })
  }
}
