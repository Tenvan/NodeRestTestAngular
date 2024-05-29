import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const hostUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for handling Server-Sent Events (SSE).
 */
export class ServerSentEventService {
  constructor(private http: HttpClient) {}

  /**
   * Creates and returns an observable for the specified SSE URL.
   * @param url The URL of the SSE endpoint.
   * @returns An observable that emits `MessageEvent` objects.
   */
  getEventSource(url: string): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        observer.next(event);
      };

      eventSource.onerror = (error) => {
        if (eventSource.readyState === 0) {
          console.log(`${url}: stream closed by the server`);
          eventSource.close();
          observer.complete();
        } else {
          observer.error(error);
        }
      };
    });
  }

  /**
   * Retrieves the world ticker events from the server.
   *
   * @param count The number of ticker events to retrieve.
   * @param ticks The number of ticks for each ticker event.
   * @returns An Observable that emits MessageEvent objects representing the ticker events.
   */
  getWorldTicker(
    name: string,
    count: number,
    ticks: number,
  ): Observable<MessageEvent> {
    const worldTickerUrl = `${hostUrl}/events/worldTickerEvent?name=${name}&count=${count}&ticks=${ticks}`;

    return this.getEventSource(worldTickerUrl);
  }

  /**
   * Retrieves the application events as an Observable of MessageEvent.
   * @returns An Observable of MessageEvent.
   */
  getAppEvents(): Observable<MessageEvent> {
    const appEventsUrl = hostUrl + '/events/appEventsEndpoint';

    return this.getEventSource(appEventsUrl);
  }
}
