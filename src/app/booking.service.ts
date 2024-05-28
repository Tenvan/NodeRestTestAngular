import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for handling Server-Sent Events (SSE).
 */
export class ServerSentEventService {
  private url = 'http://localhost:3000/events/worldTicker?count=100&ticks=200';

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
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error(error);
        }
      };
    });
  }

  /**
   * Returns an observable for the default SSE URL.
   * @returns An observable that emits `MessageEvent` objects.
   */
  getSse(): Observable<MessageEvent> {
    return this.getEventSource(this.url);
  }
}
