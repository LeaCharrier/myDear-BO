import React from 'react';
import './styles.scss';
import AdminBlock from '../AdminBlock/index';
import DashboardLinksBlock from '../DashboardLinksBlock/index';

const HeaderAdminBlock = () => {
  return (
    <div className="headerAdmin container">
      <div className="headerAdmin-nav">
        <AdminBlock />
        <DashboardLinksBlock />
      </div>
    </div>
  );
};

export default HeaderAdminBlock;
