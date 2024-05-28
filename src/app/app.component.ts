import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerSentEventService } from './booking.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/**
 * The root component of the Angular application.
 */
export class AppComponent {
  constructor(private sseClientService: ServerSentEventService) {
    const sse = this.sseClientService
      .getSse()
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data).value;
        this.Message.next(value);
      });
  }

  /**
   * The title of the application.
   */
  title = 'node-rest-test-angular';
  /**
   * Represents a behavior subject for the message.
   */
  Message = new BehaviorSubject<string>('0');
}
