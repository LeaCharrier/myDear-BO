/* eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import './styles.scss';
import '../../../styles/index.scss';
import Card from '../../Blocks/Card/index';
import TabBlock from '../../Blocks/TabBlock/index';
import SearchBarBlock from '../../Blocks/SearchBarBlock/index';
import {
  deleteRoom,
  getDataListRooms,
  getDataRoomsListSearch
} from '../../../actions/rooms';
import Modal from '../../Blocks/Modal';
import {
  setModal,
  setServiceId
} from '../../../actions/modal';
import {
  ROOM_UPDATE_PATH,
  ROOM_ADD_PATH
} from '../../../constants/routes';


class ListRoomsPages extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deleteRoom = this.deleteRoom.bind(this);
    this.cancelDeletion = this.cancelDeletion.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
    const { roomsListData } = this.props;
    roomsListData();
  }

  onChange(value) {
    const {
      roomsListSearch
    } = this.props;

    roomsListSearch(value);
  }

  deleteRoom() {
    const {
      idService,
      remove,
      setOpenModal
    } = this.props;

    remove(idService);
    setOpenModal();
  }

  cancelDeletion() {
    const { setOpenModal } = this.props;
    setOpenModal();
  }

  deleteItem(id) {
    const {
      setOpenModal,
      setId
    } = this.props;
    setOpenModal();
    setId(id);
  }

  render() {
    const {
      idService,
      isModalOpen,
      rooms
    } = this.props;

    if (!rooms) {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100"
        />
      );
    }

    if (rooms && rooms.length === 0) {
      return (
        <div className="container notFoundContent">
          <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
          <TabBlock isButton="true" to={ROOM_ADD_PATH} name="room" />

          <div className="notFound">
            <p>Il n’y a aucun résultat à afficher</p>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
        <TabBlock isButton="true" to={ROOM_ADD_PATH} name="room" />
        <div className="listRooms">
          {rooms && rooms.map((item, key) => (
            <Card
              data={item || {}}
              onDelete={() => this.deleteItem(item.id)}
              key={key}
              link={`${ROOM_UPDATE_PATH}/${item.id}`}
              type="room"
            />
          ))
          }
          <Modal
            open={isModalOpen}
            message="Êtes-vous sûr(e) de vouloir supprimer cette salle ?"
            onSubmit={this.deleteRoom}
            onCancel={this.cancelDeletion}
            id={idService}
          />
        </div>
      </div>
    );
  }
}

ListRoomsPages.propTypes = {
  roomsListData: PropTypes.func,
  rooms: PropTypes.arrayOf(PropTypes.shape({})),
  remove: PropTypes.func,
  setOpenModal: PropTypes.func,
  idService: PropTypes.string,
  setId: PropTypes.func,
  isModalOpen: PropTypes.bool,
  roomsListSearch: PropTypes.func
};

const mapStateToProps = (state) => {
  const {
    roomsListData: {
      rooms
    },
    modal: {
      idService,
      isModalOpen
    }
  } = state;

  return {
    rooms,
    idService,
    isModalOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    roomsListData: () => dispatch(getDataListRooms()),
    remove: (id) => dispatch(deleteRoom(id)),
    setOpenModal: () => dispatch(setModal()),
    setId: (id) => dispatch(setServiceId(id)),
    roomsListSearch: (value) => dispatch(getDataRoomsListSearch(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListRoomsPages);
