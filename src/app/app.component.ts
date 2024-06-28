import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientSimpleComponent } from './components/client-simple/client-simple.component';
import { WorldTickerComponent } from './components/world-ticker/world-ticker.component';

const tickerCount = 6;
const clientCount = 6;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    CommonModule,
    ClientSimpleComponent,
    WorldTickerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/**
 * The root component of the Angular application.
 */
export class AppComponent {
  clientCounts = Array(clientCount)
    .fill(0)
    .map((x, i) => i + 1);

  tickerCounts = Array(tickerCount)
    .fill(0)
    .map((x, i) => i + 1);

  title = 'Node RestTest Angular';

  WorldTicker: BehaviorSubject<string>[] = [];

  AppEvent = new BehaviorSubject<string>('');
}
