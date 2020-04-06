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
      percentage
    } = this.props;

    return (
      <div className="donneesAnalyticsNumber">
        <div className="donneesAnalyticsNumber-infos">
          <p className="donneesAnalyticsNumber-infos-bigText">{number}</p>
          <p className="donneesAnalyticsNumber-infos-smallText">{percentage}</p>
        </div>
      </div>
    );
  }
}

DonneesAnalyticsBlock.propTypes = {
  number: PropTypes.number,
  percentage: PropTypes.string
};

export default DonneesAnalyticsBlock;
