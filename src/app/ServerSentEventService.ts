import { Injectable } from '@angular/core';
import { Observable, share, type Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const hostUrl = 'http://localhost:3000';
const appEventsUrl = hostUrl + '/events/appEventsEndpoint';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for handling Server-Sent Events (SSE).
 */
export class ServerSentEventService {
  appStream!: Observable<MessageEvent<any>>;

  constructor(private http: HttpClient) {
    this.appStream = this.initEventSource(appEventsUrl);
  }

  /**
   * Creates and returns an observable for the specified SSE URL.
   * @param url The URL of the SSE endpoint.
   * @returns An observable that emits `MessageEvent` objects.
   */
  initEventSource(url: string) {
    return new Observable((observer: Subscriber<MessageEvent>) => {
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

      // Ressourcenbereinigung bei Unsubscribe
      return () => {
        eventSource.close();
      };
    }).pipe(share());
  }

  /**
   * Retrieves the world ticker events from the server.
   *
   * @param count The number of ticker events to retrieve.
   * @param ticks The number of ticks for each ticker event.
   * @returns An Observable that emits MessageEvent objects representing the ticker events.
   */
  getWorldTicker(name: string, count: number, ticks: number) {
    const worldTickerUrl = `${hostUrl}/events/worldTickerEvent?name=${name}&count=${count}&ticks=${ticks}`;

    return this.initEventSource(worldTickerUrl);
  }

  /**
   * Retrieves the application events as an Observable of MessageEvent.
   * @returns An Observable of MessageEvent.
   */
  getAppEvents() {
    return this.appStream;
  }
}
