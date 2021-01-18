import { Injectable } from '@angular/core';
interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'square-sandbox', src: 'https://js.squareupsandbox.com/v2/paymentform' },
  { name: 'square', src: 'https://js.squareup.com/v2/paymentform' },
  { name: 'address-parse', src: './parse-address.js' },
  //{ name: 'paypal', src: 'https://www.paypal.com/sdk/js?client-id=AqcVCEpaRNPSEWMbX4WCLEWOHE.4Arp7bD1jo0-Oy6aI9GqDMYIRhUon&currency=USD'}
  { name: 'paypal', src: 'https://www.paypal.com/sdk/js?client-id=AWtzBeZSgO97peytz7YRMflapKwZBp56RWxU4xxjSCuBvvyGhIdLHarMY7cX5DHgwIg8nHXD5yUa-PhV&currency=USD&disable-funding=credit,card' },
];

@Injectable({
  providedIn: 'root'
})
export class LoadscriptsService {
  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }


  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        // @ts-ignore
        if (script.readyState) {  // IE
          // @ts-ignore
          script.onreadystatechange = () => {
            // @ts-ignore
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              // @ts-ignore
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  // Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script); // <--- !!!
      } else {
        console.warn('Already Loaded...')
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

  isAlreadyLoaded(name): boolean {
    return this.scripts[name]?.loaded;
  }

}
