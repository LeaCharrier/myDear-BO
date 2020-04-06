import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';
import DonneesAnalyticsNumberBlock from '../DonneesAnalyticsNumberBlock/index';

class AnalyticsNumberBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data,
      title
    } = this.props;

    return (
      <div className="analyticsNumberBlock">
        <h2 className="analyticsNumberBlock-title">{title}</h2>
        <div className="analyticsNumberBlock-contain">
          <DonneesAnalyticsNumberBlock number={data.total} percentage={data.accepted['last month'].percent} />
        </div>
      </div>
    );
  }
}

AnalyticsNumberBlock.propTypes = {
  data: PropTypes.shape({}),
  title: PropTypes.string
};

export default AnalyticsNumberBlock;
