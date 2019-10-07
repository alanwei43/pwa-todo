import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PubSubService {
  /*
  private hub: { [key: string]: Array<(data: any) => void> } = {};
  constructor() { }
  sub(topic: string, callback: (data: any) => void) {
    if (!this.hub[topic]) {
      this.hub[topic] = [];
    }
    this.hub[topic].push(callback);
  }
  pub(topic: string, data: any) {
    (this.hub[topic] || []).forEach(callback => {
      callback(data);
    });
  }
  */
  private hub: Subject<{ topic: string, data: any }> = new Subject();
  sub(topic: string, callback: (data: any) => void) {
    this.hub.subscribe(event => {
      if (event.topic === topic) {
        callback(event.data);
      }
    })
  }
  pub(topic: string, data: any) {
    this.hub.next({ topic: topic, data: data });
  }
}
