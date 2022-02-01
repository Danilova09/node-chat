import { Component, Input } from '@angular/core';
import { Message } from '../../shared/message.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.sass']
})
export class MessageItemComponent {
  @Input() message!: Message;
}
