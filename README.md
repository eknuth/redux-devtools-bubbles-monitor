Redux DevTools Log Monitor
=========================

An unobtrusive monitor for [Redux DevTools](https://github.com/gaearon/redux-devtools). Depends on toastr and jquery (sorry, it was easy!)

![](http://imgur.com/KSxngwN.gif)

## Setup
### NPM
Install the npm module.
```
npm install --save-dev redux-devtools-bubbles-monitor
```
Include the component with the usual DevTools setup.
### JSX
The monitor respects the state of visibleOnLoad from the DevTools component props. If visibleOnLoad is true, notifications will appear when the DebugPanel component is mounted. <strong>Ctrl-h</strong> will toggle the notification state of the monitor.
```javascript
import BubblesMonitor from 'redux-devtools-bubbles-monitor'
// requires webpack css loader or just include from cdn
require('redux-devtools-bubbles-monitor/lib/toastr.min.css')
<DebugPanel top right bottom>
  <DevTools store={store}
            monitor={BubblesMonitor}
            visibleOnLoad={true} />
</DebugPanel>

```
### CSS
If you aren't using the webpack css loader you can include the css for toastr from cdn.
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
```
### License

MIT
