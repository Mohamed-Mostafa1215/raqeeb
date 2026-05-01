import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../core/services/mock-data.service';
import { CardComponent } from '../../../shared/components/card/card.component';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, TranslateModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  private mockService = inject(MockDataService);
  
  threads = signal<any[]>([]);
  activeThread = signal<any>(null);
  
  messages = signal([
    { id: 1, sender: 'System', text: 'PROTOCOL CHANNEL SECURED', time: '08:00 AM', isMe: false },
    { id: 2, sender: 'SARAH AHMED', text: 'Project Orion blueprints updated.', time: '09:00 AM', isMe: false },
    { id: 3, sender: 'MARCUS', text: 'Confirmed. Analyzing site variations.', time: '09:12 AM', isMe: true }
  ]);

  newMessage = '';

  ngOnInit() {
    this.mockService.getChatThreads().subscribe(data => {
      this.threads.set(data);
      this.activeThread.set(data[0]);
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    
    this.messages.update(m => [...m, { 
      id: Date.now(), 
      sender: 'MARCUS', 
      text: this.newMessage, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      isMe: true 
    }]);
    
    this.newMessage = '';
  }
}
