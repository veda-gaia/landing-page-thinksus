/// <reference types="@angular/localize" />

import { registerLocaleData } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import ptBr from '@angular/common/locales/pt';

import { AppModule } from './app/app.module';

registerLocaleData(ptBr, 'pt-BR');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
