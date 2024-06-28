import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  type OnInit,
} from '@angular/core';
import { ServerSentEventService } from '../../ServerSentEventService';
import type { IWorldTickerEventArgs } from '../../models/IAppEventArgs';

@Component({
  selector: 'app-world-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-ticker.component.html',
  styleUrl: './world-ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorldTickerComponent implements OnInit {
  title = 'World Ticker';

  tickerId = input(0);

  eventPayload = signal(0);

  start = Math.floor(Math.random() * 10000);

  count = Math.floor(Math.random() * 400) + 100;

  ticks = Math.floor(Math.random() * 500);

  constructor(private sseService: ServerSentEventService) {}
  ngOnInit(): void {
    this.sseService
      .getWorldTicker(
        `Ticker ${this.tickerId().toString()}`,
        this.start,
        this.count,
        this.ticks,
      )
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data) as IWorldTickerEventArgs;
        console.log('WorldTickerComponent', value);
        this.eventPayload.set(value.payload);
      });
  }
}
