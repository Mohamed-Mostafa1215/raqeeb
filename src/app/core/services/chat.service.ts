import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  $unreadCount = signal(0);
  $messages = signal<any[]>([]);

  sendMessage(text: string) {
    console.log('Sending message:', text);
  }
}
