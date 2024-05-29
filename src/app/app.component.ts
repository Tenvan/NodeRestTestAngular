import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerSentEventService } from './ServerSentEventService';

const count = 30;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/**
 * The root component of the Angular application.
 */
export class AppComponent {
  public counts: number[] = [];

  constructor(private sseService: ServerSentEventService) {
    this.sseService
      .getAppEvents()
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data);
        this.AppEvent.next(value);
      });

    for (let index = 0; index < count; index++) {
      this.counts.push(Math.floor(Math.random() * 50));
      this.WorldTicker[index] = new BehaviorSubject<string>('');

      console.log(`world${index}: ${this.counts[index]}`);

      this.sseService
        .getWorldTicker(`world${index}`, this.counts[index], 100)
        .pipe()
        .subscribe((event: MessageEvent) => {
          const value = JSON.parse(event.data);
          this.WorldTicker[index].next(`'${value.event}': ${value.payload}`);
        });
    }
  }

  title = 'node-rest-test-angular';

  WorldTicker: BehaviorSubject<string>[] = [];

  AppEvent = new BehaviorSubject<string>('');
}
