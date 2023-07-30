import { Injectable } from '@angular/core';

@Injectable()
export class Truncate {
  constructor() {}

  truncateString(str: string, length: number): string {
    if (str.length <= length) {
      return str;
    }
    return `${str.substring(0, length)}...`;
  }
}
