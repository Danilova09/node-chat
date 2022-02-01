import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessagesService } from '../shared/messages.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.sass']
})
export class MessageFormComponent implements OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  postingMessage = false;
  postingMessageSubscription!: Subscription;

  constructor(
    private messagesService: MessagesService,
  ) {}

  ngOnInit(): void {
    this.postingMessageSubscription = this.messagesService.postingMessage.subscribe((posting: boolean) => {
      this.postingMessage = posting;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const message = {
        author: this.form.controls['author'].value,
        message: this.form.controls['message'].value,
      };
      this.messagesService.postMessage(message);
    }
  }

  ngOnDestroy() {
    this.postingMessageSubscription.unsubscribe();
  }
}
