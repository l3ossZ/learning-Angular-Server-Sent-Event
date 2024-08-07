import {Injectable, NgZone} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonSseService {

  constructor(
    private zone: NgZone
  ) {
  }

  getServerSentEvent(): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource("http://localhost:8080/person/get-all-person");
      eventSource.onmessage = (event) => {
        this.zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = (error) => {
        this.zone.run(() => {
          observer.error(error);
        });
      };
      return () => {
        eventSource.close();
      };
    });
  }

//Fail
  // getServerSentEvent(): Observable<any> {
  //   return new Observable(observer => {
  //     let eventSource: EventSource;
  //
  //     const connect = () => {
  //       if (eventSource) {
  //         eventSource.close();
  //       }
  //
  //       eventSource = new EventSource("http://localhost:8080/person/get-all-person");
  //
  //       eventSource.onmessage = event => this.zone.run(() => observer.next(event));
  //
  //       eventSource.onerror = () => {
  //         eventSource.close();
  //         setTimeout(connect, 1000);  // Reconnect after 1 second
  //       };
  //
  //       return () => eventSource.close();
  //     };
  //
  //     connect();
  //
  //     return () => eventSource.close();
  //   });
  // }
}
