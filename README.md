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
```javascript
import BubblesMonitor from 'redux-devtools-bubbles-monitor'

<DebugPanel top right bottom>
  <DevTools store={store}
            monitor={BubblesMonitor}
            visibleOnLoad={true} />
</DebugPanel>

```

### License

MIT
