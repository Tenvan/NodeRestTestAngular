import { Injectable } from '@angular/core';
import { Observable, share, type Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const hostUrl = 'http://127.0.0.1:3000';
const sseAppEvents = hostUrl + '/events/sseAppEvents';
const sseAppTicker = hostUrl + '/events/sseAppTicker';
const sseClientTicker = hostUrl + '/events/sseClientTicker';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for handling Server-Sent Events (SSE).
 */
export class ServerSentEventService {
  appStream!: Observable<MessageEvent<any>>;

  constructor(private http: HttpClient) {
    this.appStream = this.initEventSource(sseAppEvents);
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

  getClientTicker(name: string, start: number, count: number, ticks: number) {
    const worldTickerUrl = `${sseClientTicker}?name=${name}&start=${start}&count=${count}&ticks=${ticks}`;
    return this.initEventSource(worldTickerUrl);
  }

  getAppTicker() {
    return this.initEventSource(sseAppTicker);
  }

  getAppEvents() {
    return this.initEventSource(sseAppEvents);
  }
}
