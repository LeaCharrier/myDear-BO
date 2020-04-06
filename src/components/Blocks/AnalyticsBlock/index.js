import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';
import DonneesAnalyticsBlock from '../DonneesAnalyticsBlock/index';

class AnalyticsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data
    } = this.props;

    let title;
    if (data.type === 'users') {
      title = 'Utitlisateurs';
    }

    if (data.type === 'services') {
      title = 'Les services';
    }

    if (data.type === 'rooms') {
      title = 'Les rooms';
    }

    return (
      <div key className="analyticsBlock">
        <h2 className="analyticsBlock-title">{title}</h2>
        <div className="analyticsBlock-contain">
          <DonneesAnalyticsBlock number={data.total} percentage={data.new['last day'].percent} text="Par jour" />
          <DonneesAnalyticsBlock number={data.total} percentage={data.new['last month'].percent} text="Par mois" classBlock="isLess" />
        </div>
      </div>
    );
  }
}

AnalyticsBlock.propTypes = {
  data: PropTypes.shape({})
};

export default AnalyticsBlock;
