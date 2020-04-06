import React from 'react';
import BaseLayout from '../../Layout/BaseLayout';
import ListRoomsPages from '../../Pages/ListRoomsPage/index';

const ListRoomsPageWithLayout = () => {
  return (
    <div>
      <BaseLayout>
        <ListRoomsPages />
      </BaseLayout>
    </div>
  );
};

export default ListRoomsPageWithLayout;
