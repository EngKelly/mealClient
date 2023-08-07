import { HostListener, Injectable, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Mobile {
  @Output() IsMobile!: boolean;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.handleWindowResize();
  }

  handleWindowResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      this.IsMobile = false;
    } else {
      this.IsMobile = true;
    }
  }
}
