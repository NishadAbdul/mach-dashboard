import { Injectable } from '@angular/core';

export function extract(s: string) {
  return s;
}

interface SharedObject {
  [id: string]: any;
}

@Injectable()
export class AppState {
  shared: SharedObject = {};

  get state() {
    return this.shared = this._clone(this.shared);
  }

  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    return this.shared[prop] = value;
  }

  private _clone(object: SharedObject) {
    return JSON.parse(JSON.stringify( object ));
  }

  public setSharedObj(id: string, obj: any){
    this.shared[id] = obj;
    sessionStorage.setItem(id, JSON.stringify(obj));
  }

  public getSharedObj(id: string){
    if (this.shared[id]) {
      return this.shared[id];
    } else if(sessionStorage.getItem(id)){
      let data: any = sessionStorage.getItem(id);
      this.shared[id] = data;
      return JSON.parse(data);
    } else {
      return JSON.parse('{}');
    }
  }

  public deleteSharedObj(id: string) {
    if (this.shared[id]) {
      delete this.shared[id];
    }
    if(sessionStorage.getItem(id)) {
      sessionStorage.removeItem(id);
    }
    
  }
}
