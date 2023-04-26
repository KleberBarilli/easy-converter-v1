import { Injectable } from '@angular/core';

interface Env {
  API_HOST: string;
  API_KEY: string;
}

declare global {
  interface Window {
    env: Env;
  }
}

@Injectable({
  providedIn: 'root',
})
export class EnvProvider {
  public readonly API_HOST: string;
  public readonly API_KEY: string;

  constructor() {
    const env: Env = window.env;
    this.API_HOST = env.API_HOST;
    this.API_KEY = env.API_KEY;
  }
}
