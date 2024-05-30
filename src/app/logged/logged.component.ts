import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent {
    // Pega a url atual para manipular a toolbar e a sidebar
    rotaAtual : string = '';
    rotaSubscribe$ : Subscription;
    rotasSemHUD : string[] = ['/payment'];
  
    constructor(private router: Router) {
      // Atualiza a variavel da rota a cada navegação
      this.rotaSubscribe$ = this.router.events.subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationEnd) {
            this.rotaAtual = event.url.replace('/logged', '');
          }
        }
      );
    }
}
