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
  selector: 'app-events',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './app-events.component.html',
  styleUrl: './app-events.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppEventsComponent implements OnInit {
  // #region Properties (4)

  public clientId = input(0);
  public eventObjecValue = signal(0);
  public eventObjectName = signal('void');
  public title = 'App Events';

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(private sseService: ServerSentEventService) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public ngOnInit(): void {
    this.sseService
      .getAppEvents()
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
