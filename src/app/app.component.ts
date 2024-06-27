import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServerSentEventService } from './ServerSentEventService';
import { ClientSimpleComponent } from './components/client-simple/client-simple.component';

const worldCount = 3;
const clientCount = 15;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule, ClientSimpleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/**
 * The root component of the Angular application.
 */
export class AppComponent {
  public counts: number[] = [];

  public clientCounts = Array(clientCount)
    .fill(0)
    .map((x, i) => i + 1);

  constructor(private sseService: ServerSentEventService) {
    for (let index = 0; index < worldCount; index++) {
      this.counts.push(Math.floor(Math.random() * 500));
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
