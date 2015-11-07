import React, { PropTypes, Component } from 'react'
import toastr from 'toastr'

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
  render () {
    const { stagedActions } = this.props
    const action = stagedActions[stagedActions.length-1]
    const bubble = this.getNotificationTypeForAction(action)
    const body = this.getNotificationBodyForAction(action)
    bubble(body, action.type)
    return null
  }
}
