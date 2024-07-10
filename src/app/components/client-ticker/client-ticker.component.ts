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
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-ticker.component.html',
  styleUrl: './client-ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTickerComponent implements OnInit {
  title = 'Client Ticker';

  tickerId = input(0);

  eventPayload = signal(0);

  start = signal(0);

  count = signal(20);

  ticks = signal(200);

  constructor(private sseService: ServerSentEventService) {}
  ngOnInit(): void {
    this.start.set(this.tickerId() * 1000);

    this.sseService
      .getClientTicker(
        `Ticker ${this.tickerId().toString()}`,
        this.start(),
        this.count(),
        this.ticks(),
      )
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data) as IWorldTickerEventArgs;
        this.eventPayload.set(value.payload);
      });
  }
}
