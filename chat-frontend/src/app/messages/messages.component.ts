import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessagesService } from '../shared/messages.service';
import { Message } from '../shared/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  fetchingMessages = false;
  messagesSubscription!: Subscription;
  fetchingMessagesSubscription!: Subscription;

  constructor(
    private messagesService: MessagesService,
  ) {}

  ngOnInit(): void {
    this.messagesService.startMessagesInterval();
    this.messagesService.fetchMessages();
    this.messagesSubscription = this.messagesService.messagesChange.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
    this.fetchingMessagesSubscription = this.messagesService.fetchingMessages.subscribe((fetching: boolean) => {
      this.fetchingMessages = fetching;
    });
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
    this.fetchingMessagesSubscription.unsubscribe();
  }
}
