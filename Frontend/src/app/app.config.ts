import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import appConfigFile from '../../app-config.json';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideAnimationsAsync()]
};

// export const backendUrl = 'https://localhost:7211/api';
export const backendUrl = appConfigFile['backoffice-url'];
export const otherBackendUrl = appConfigFile['backoffice-medical-records-url'];
