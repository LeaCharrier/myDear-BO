import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.scss';
import '../../../styles/index.scss';
import PropTypes from 'prop-types';
import RoomFormBlock from '../../Blocks/FormsBlock/RoomFormBlock/index';
import {
  getDataListRoombyId,
  isEditRoom
} from '../../../actions/rooms';

class FormRoomPage extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentWillMount() {
    const {
      id,
      roomById,
      editRoom,
      history: {
        location: {
          pathname
        }
      }
    } = this.props;

    const params = pathname.split('/');

    if (params.length === 4) {
      roomById(id);
      editRoom('true');
    } else {
      editRoom('false');
    }
  }

  render() {
    return (
      <div className="updateRoom container">
        <RoomFormBlock />
      </div>
    );
  }
}

FormRoomPage.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({}),
  roomById: PropTypes.func,
  editRoom: PropTypes.func,
  history: PropTypes.shape({})
};

const mapStateToProps = (state) => {
  const {
    roomsListData: {
      roomById: rooms
    }
  } = state;

  return {
    rooms
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    roomById: (id) => dispatch(getDataListRoombyId(id)),
    editRoom: (value) => dispatch(isEditRoom(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormRoomPage));
