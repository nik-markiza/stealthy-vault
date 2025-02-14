import { makeAutoObservable } from "mobx";

class FilesStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

export const filesStore = new FilesStore();