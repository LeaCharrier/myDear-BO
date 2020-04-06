import React, { Component } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import './styles.scss';

class renderMultiselect extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      meta,
      data,
      input
    } = this.props;

    return (
      <div>
        <Multiselect
          {...input}
          onBlur={() => input.onBlur()}
          value={input.value || []}
          data={data}
          valueField="id"
          textField="tagName"
        />
        {meta.error && meta.touched && <span>{meta.error}</span>}
      </div>
    );
  }
}

export default renderMultiselect;
