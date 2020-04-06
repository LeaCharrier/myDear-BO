import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';

class DonneesAnalyticsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      number,
      percentage,
      text,
      classBlock
    } = this.props;

    return (
      <div className="donneesAnalytics">
        <div className={`donneesAnalytics-infos ${classBlock}`}>
          <p className="donneesAnalytics-infos-bigText">{number}</p>
          <p className="donneesAnalytics-infos-smallText">{percentage}</p>
        </div>
        <p className="donneesAnalytics-title">{text}</p>
      </div>
    );
  }
}

DonneesAnalyticsBlock.propTypes = {
  number: PropTypes.number,
  percentage: PropTypes.string,
  text: PropTypes.string,
  classBlock: PropTypes.string
};

export default DonneesAnalyticsBlock;
