import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServerSentEventService } from '../../ServerSentEventService';

@Component({
  selector: 'app-client-simple',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './client-simple.component.html',
  styleUrl: './client-simple.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSimpleComponent {
  title = 'simple-client';

  @Input()
  clientId: number | undefined;

  ClientEvent = new BehaviorSubject<string>('');

  constructor(private sseService: ServerSentEventService) {
    this.sseService
      .getAppEvents()
      .pipe()
      .subscribe((event: MessageEvent) => {
        const value = JSON.parse(event.data);
        this.ClientEvent.next(value);
      });
  }
}
