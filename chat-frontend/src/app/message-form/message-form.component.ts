import { Component, OnInit, ViewChild } from '@angular/core';
import { MessagesService } from '../shared/messages.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.sass']
})
export class MessageFormComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  constructor(
    private messagesService: MessagesService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const message = {
      author: this.form.controls['author'].value,
      message: this.form.controls['message'].value,
    }
    this.messagesService.addMessage(message);
  }

}
