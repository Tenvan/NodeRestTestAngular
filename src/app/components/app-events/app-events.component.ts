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
import type { Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './app-events.component.html',
  styleUrl: './app-events.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppEventsComponent implements OnInit {
  // #region Properties (7)

  public eventId = input(0);
  public receivedEventId = signal('');
  public receivedEventName = signal('');
  public sourceEventId = signal('');
  public sourceEventName = signal('');
  public sourceEventData = signal('');
  public stream: Subscription | undefined;
  public title = 'App Events';

  // #endregion Properties (7)

  // #region Constructors (1)

  constructor(private sseService: ServerSentEventService) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public ngOnDestroy(): void {
    this.stream?.unsubscribe();
    console.log('Unsubscribed getAppEvents', this.receivedEventId());
  }

  public ngOnInit(): void {
    console.log('getAppEvents', this.receivedEventId());

    this.stream = this.sseService
      .getAppEvents(`appEvent${this.receivedEventId()}`)
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data) as IAppEventArgs;
        this.receivedEventId.set(value.id);
        this.receivedEventName.set(value.event);
        this.sourceEventId.set(value.payload.value.data.id);
        this.sourceEventName.set(value.payload.value.data.event);
        this.sourceEventData.set(JSON.stringify(value.payload.value, null, 2));
      });
  }

  // #endregion Public Methods (2)
}
