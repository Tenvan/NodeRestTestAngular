import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SseService } from './booking.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private sseClientService: SseService) {
    const sse = this.sseClientService.getSse().pipe().subscribe((event: MessageEvent) => {
      const value = JSON.parse(event.data).value;
      console.log('Received event: ', value);
      this.Message.next(value);
      
    });
  }

  title = 'node-rest-test-angular';
  Message = new BehaviorSubject<string>("0");
}
