import React from 'react';

export default class Frame extends React.Component {
  componentWillUnmount() {
     window.URL.revokeObjectURL(this.props.src)
  }

  render() {
    const {src} = this.props;
    return <iframe style={{width: '100%', border: 'none', height: '100%'}} src={src} />
  }
}
