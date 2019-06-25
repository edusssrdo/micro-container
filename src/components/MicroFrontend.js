import React from 'react'

class MicroFrontend extends React.Component {
  componentDidMount() {
    const { name, host, document } = this.props
    const scriptId = `micro-script-${name}`

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend()
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = host
    script.onload = this.renderMicroFrontend
    document.head.appendChild(script)
  }

  componentWillUnmount() {
    const { name, window } = this.props

    window[`unmount${name}`](`${name}-container`)
  }

  renderMicroFrontend = () => {
    const { name, window, history } = this.props

    window[`render${name}`](`${name}-container`, history)
  }

  render() {
    return <main id={`${this.props.name}-container`} />
  }
}

MicroFrontend.defaultProps = {
  document,
  window,
}

export default MicroFrontend