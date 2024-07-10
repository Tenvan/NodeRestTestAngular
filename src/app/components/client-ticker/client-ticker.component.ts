import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  type OnDestroy,
  type OnInit,
} from '@angular/core';
import { ServerSentEventService } from '../../ServerSentEventService';
import type { IClientTickerEventArgs } from '../../models/IClientTickerEventArgs';
import type { Subscription } from 'rxjs';

@Component({
  selector: 'client-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-ticker.component.html',
  styleUrl: './client-ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTickerComponent implements OnInit, OnDestroy {
  // #region Properties (7)

  public count = signal(1000);
  public eventPayload = signal(0);
  public start = signal(0);
  public stream: Subscription | undefined;
  public tickerId = input(0);
  public ticks = signal(333);
  public title = 'Client Ticker';

  // #endregion Properties (7)

  // #region Constructors (1)

  constructor(private sseService: ServerSentEventService) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public ngOnDestroy(): void {
    this.stream?.unsubscribe();
    console.log('Unsubscribed from ticker', this.tickerId());
  }

  public ngOnInit(): void {
    this.start.set(this.tickerId() * 1000);

    console.log(
      'getClientTicker',
      this.tickerId(),
      this.start(),
      this.count(),
      this.ticks(),
    );

    this.stream = this.sseService
      .getClientTicker(
        `Ticker ${this.tickerId().toString()}`,
        this.start(),
        this.count(),
        this.ticks(),
      )
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data) as IClientTickerEventArgs;
        this.eventPayload.set(value.payload);
      });
  }

  // #endregion Public Methods (2)
}
