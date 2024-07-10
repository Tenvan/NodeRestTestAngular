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

  start = 0;

  count = 0;

  ticks = 0;

  constructor(private sseService: ServerSentEventService) {}
  ngOnInit(): void {
    this.start = this.tickerId() * 1000;
    this.count = 20;
    this.ticks = 200;

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
        this.eventPayload.set(value.payload);
      });
  }
}
