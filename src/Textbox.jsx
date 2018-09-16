import React, { Component } from 'react';

class Textbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const style = {
      top: `${data.top}px`,
    }
    return (
      <div className="text-box__wrap" style={style}>
        <div className="text-box__inner">
          <div className="text-box__title">
            {data.title}
          </div>
          <div className="text-box__text">
            {data.text}
          </div>
        </div>
      </div>
    );
  }
}

export default Textbox;