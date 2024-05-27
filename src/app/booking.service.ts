import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SseService {
    private url = 'http://localhost:3000/Bookings/sse';

    constructor(private http: HttpClient) { }

    getEventSource(url: string): Observable<MessageEvent> {
        return new Observable(observer => {
            const eventSource = new EventSource(url);

            eventSource.onmessage = event => {
                observer.next(event);
            };

            eventSource.onerror = error => {
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

    getSse(): Observable<MessageEvent> {
        return this.getEventSource(this.url);
    }
}