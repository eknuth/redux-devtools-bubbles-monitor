import React, { PropTypes, Component } from 'react'
import toastr from 'toastr'
import { isFSA } from 'flux-standard-action';

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "4000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export default class BubbleMonitor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notificationState: this.props.visibleOnLoad
    }
  }
  static propTypes = {
    // Stuff you can use
    computedStates: PropTypes.array.isRequired,
    currentStateIndex: PropTypes.number.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,

    // Stuff you can do
    reset: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    rollback: PropTypes.func.isRequired,
    sweep: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired, // ({ index })
    jumpToState: PropTypes.func.isRequired // ({ index })
  }
  getNotificationTypeForAction (action) {
    if (action.error) {
      return toastr.error
    } else if (action.type.startsWith('@@')) {
      return toastr.info
    } else {
      return toastr.success
    }
  }
  getNotificationBodyForAction (action) {
    const payload = {...action}
    const keys = Object.keys(payload).filter(key => {
      return key !== 'type' && key !== 'error'
    })
    const items = keys.map(key => {
      const item = payload[key]
      if (item instanceof Error) {
        return `${key}: ${item}`
      } else if (item !== null && typeof item === 'object') {
        return `${key} (object keys): ${Object.keys(item).join(', ')}`
      } else {
        return `${key}: ${item}`
      }
    })
    return items.join('<br/>')
  }
  componentDidMount () {
    if (this.state.notificationState) {
      toastr.success('Redux action notifications have been enabled by default, press ctrl-h to disable.')
    } else {
      toastr.info('Redux action notifications have been disabled by default, press ctrl-h to enable.')
    }
    window.addEventListener('keypress', this.handleKeypress, false);
  }
  componentWillMount () {
    window.removeEventListener('keypress', this.handleKeypress, false);
  }
  handleKeypress = (e) => {
    const keys = {
      h: 8
    }
    if (e.ctrlKey && e.which === keys.h) {
      this.toggleNotifications()
    }
  }
  toggleNotifications = () => {
    const { notificationState } = this.state
    if (notificationState) {
      toastr.info('Redux action notifications have been disabled, press ctrl-h to enable.')
      this.setState({notificationState: false })
    } else {
      toastr.success('Redux action notifications have been enabled, press ctrl-h to disable. This last action dispatched will be displayed.')
      this.setState({notificationState: true })
    }
  }
  render () {
    if (!this.state.notificationState) { return null }
    const { stagedActions } = this.props
    const action = stagedActions[stagedActions.length-1]
    const bubble = this.getNotificationTypeForAction(action)
    const body = this.getNotificationBodyForAction(action)
    bubble(body, action.type)

    if (!isFSA(action)) {
      toastr.warning(`${action.type} is not a flux standard action.`)
    }
    return null
  }
}
