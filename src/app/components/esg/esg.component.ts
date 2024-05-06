import { Component } from '@angular/core';

@Component({
  selector: 'app-esg',
  templateUrl: './esg.component.html',
  styleUrls: ['./esg.component.scss']
})
export class EsgComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
