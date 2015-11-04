Redux DevTools Log Monitor
=========================

An unobtrusive monitor for [Redux DevTools](https://github.com/gaearon/redux-devtools). Depends on toastr and jquery (sorry, it was easy!)

![](http://imgur.com/KSxngwN.gif)

## Setup
Include the component with the usual DevTools setup.
### JSX
```javascript
import BubblesMonitor from 'redux-devtools-bubbles-monitor'

<DebugPanel top right bottom>
  <DevTools store={store}
            monitor={BubblesMonitor}
            visibleOnLoad={true} />
</DebugPanel>

```
### CSS
You also need to include the css for toastr.
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
```
### License

MIT
