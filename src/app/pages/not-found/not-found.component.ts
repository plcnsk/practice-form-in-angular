import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: ` <div class="text">Not found...</div> `,
  styles: `
    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  `,
})
export class NotFoundComponent {}
