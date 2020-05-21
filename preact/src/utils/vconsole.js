import { getQueryString } from './utils';

if (getQueryString().debug) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = function () {
    window.vConsole = new window.VConsole();
  };
  script.src = 'https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}
