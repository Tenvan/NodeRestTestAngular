import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  type OnInit,
} from '@angular/core';
import { ServerSentEventService } from '../../ServerSentEventService';
import { IAppEventArgs } from '../../models/IAppEventArgs';

@Component({
  selector: 'client-ticker',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './app-ticker.component.html',
  styleUrl: './app-ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppTickerComponent implements OnInit {
  // #region Properties (4)

  public tickerId = input(0);
  public eventObjecValue = signal(0);
  public eventObjectName = signal('void');
  public title = 'App Ticker';

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(private sseService: ServerSentEventService) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public ngOnInit(): void {
    this.sseService
      .getAppTicker()
      .pipe()
      .subscribe((event: MessageEvent) => {
        console.log('Received event: ', event);
        const value = JSON.parse(event.data) as IAppEventArgs;
        this.eventObjectName.set(value.payload.value.data.event);
        this.eventObjecValue.set(value.payload.value.data.payload);
      });
  }

  // #endregion Public Methods (1)
}
