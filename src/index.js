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
  render () {
    const { stagedActions } = this.props
    const action = stagedActions[stagedActions.length-1]
    const keys = Object.keys(action).filter(key => key !== 'type')
    const body = keys.map(key => `${key}: ${action[key]}`).join('<br/>')
    let bubble = action.type.startsWith('@@')? toastr.info: toastr.success
    bubble(body, action.type)
    return null
  }
}
