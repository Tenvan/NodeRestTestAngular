import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  type OnInit,
} from '@angular/core';
import { ServerSentEventService } from '../../ServerSentEventService';
import type { IClientTickerEventArgs } from '../../models/IClientTickerEventArgs';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-ticker.component.html',
  styleUrl: './client-ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTickerComponent implements OnInit {
  title = 'App Ticker';

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
      .getClientTicker(
        `Ticker ${this.tickerId().toString()}`,
        this.start,
        this.count,
        this.ticks,
      )
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data) as IClientTickerEventArgs;
        this.eventPayload.set(value.payload);
      });
  }
}
