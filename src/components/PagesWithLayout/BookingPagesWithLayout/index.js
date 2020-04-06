import React from 'react';
import BaseLayout from '../../Layout/BaseLayout';
import ListBooking from '../../Pages/ListBookingPage/index';

const ListBookingWithLayout = () => {
  return (
    <div>
      <BaseLayout>
        <ListBooking />
      </BaseLayout>
    </div>
  );
};

export default ListBookingWithLayout;
