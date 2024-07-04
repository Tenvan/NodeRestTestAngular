import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  type OnInit,
} from '@angular/core';
import { ServerSentEventService } from '../../ServerSentEventService';
import { IAppEventArgs } from '../../models/IAppEventArgs';
import { input } from '@angular/core';

@Component({
  selector: 'app-client-simple',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './client-simple.component.html',
  styleUrl: './client-simple.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ClientSimpleComponent implements OnInit {
  title = 'Simple Client';

  clientId = input(0);

  eventObjecValue = signal(0);

  eventObjectName = signal('void');

  constructor(private sseService: ServerSentEventService) {}
  ngOnInit(): void {
    this.sseService
      .getAppEvents()
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data) as IAppEventArgs;
        this.eventObjectName.set(value.payload.value.data.event);
        this.eventObjecValue.set(value.payload.value.data.payload);
      });
  }
}
