import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  type OnInit,
} from '@angular/core';
import type { Subscription } from 'rxjs';
import { ServerSentEventService } from '../../ServerSentEventService';
import { IAppTickerEventArgs } from '../../models/IAppTickerEventArgs';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './app-ticker.component.html',
  styleUrl: './app-ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppTickerComponent implements OnInit {
  // #region Properties (5)

  public streamId = signal('void');
  public messageText = signal('void');
  public dataText = signal('void');
  public stream: Subscription | undefined;
  public tickerId = input(0);
  public title = 'App Ticker';

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor(private sseService: ServerSentEventService) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public ngOnDestroy(): void {
    this.stream?.unsubscribe();
    console.log('Unsubscribed getClientTicker', this.tickerId());
  }

  public ngOnInit(): void {
    console.log('getClientTicker', this.tickerId());

    this.stream = this.sseService
      .getAppTicker(`appTicker${this.tickerId()}`)
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data) as IAppTickerEventArgs;
        this.streamId.set(value.id);
        this.dataText.set(value.payload.data);
        this.messageText.set(value.payload.message);
      });
  }

  // #endregion Public Methods (2)
}
