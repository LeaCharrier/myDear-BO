import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import './styles.scss';
import '../../../styles/index.scss';
import Modal from '../../Blocks/Modal';
import TabBlock from '../../Blocks/TabBlock/index';
import SearchBarBlock from '../../Blocks/SearchBarBlock/index';
import Card from '../../Blocks/Card';
import {
  getDataListUsers,
  deleteUser,
  getDataUsersListSearch
} from '../../../actions/users';
import {
  setModal,
  setServiceId
} from '../../../actions/modal';
import {
  USER_UPDATE_PATH,
  USER_ADD_PATH
} from '../../../constants/routes';

class ListUsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.deleteServiceProvider = this.deleteServiceProvider.bind(this);
    this.cancelDeletion = this.cancelDeletion.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
    const { usersListData } = this.props;
    usersListData();
  }

  onChange(value) {
    const {
      usersListSearch
    } = this.props;

    usersListSearch(value);
  }

  deleteServiceProvider() {
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
      users,
      isModalOpen,
      idService,
      role
    } = this.props;

    if (role === 'serviceProvider') {
      return null;
    }

    if (!users) {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100"
        />
      );
    }

    if (users && users.length === 0) {
      return (
        <div className="container notFoundContent">
          <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
          <TabBlock isButton="true" to={USER_ADD_PATH} name="users" />

          <div className="notFound">
            <p>Il n’y a aucun résultat à afficher</p>
          </div>
        </div>
      );
    }

    return (
      <div className="containUsers container">
        <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
        <TabBlock isButton="true" to={USER_ADD_PATH} name="users" />
        <div className="containUsers-content">
          {users
            .map((item, key) => (
              <Card
                data={item}
                key={key}
                onDelete={() => this.deleteItem(item.id)}
                link={`${USER_UPDATE_PATH}/${item.id}`}
                type="users"
              />
            ))
          }
          <Modal
            open={isModalOpen}
            message="Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?"
            onSubmit={this.deleteServiceProvider}
            onCancel={this.cancelDeletion}
            id={idService}
          />
        </div>
      </div>
    );
  }
}

ListUsersPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
  usersListData: PropTypes.func,
  isModalOpen: PropTypes.bool,
  idService: PropTypes.string,
  remove: PropTypes.func,
  setOpenModal: PropTypes.func,
  setId: PropTypes.func,
  usersListSearch: PropTypes.func,
  role: PropTypes.string
};

const mapStateToProps = (state) => {
  const {
    usersData: {
      users: {
        role
      }
    },
    usersListData: {
      users
    },
    modal: {
      idService,
      isModalOpen
    }
  } = state;

  return {
    users,
    idService,
    isModalOpen,
    role
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    usersListData: () => dispatch(getDataListUsers()),
    remove: (id) => dispatch(deleteUser(id)),
    setOpenModal: () => dispatch(setModal()),
    setId: (id) => dispatch(setServiceId(id)),
    usersListSearch: (value) => dispatch(getDataUsersListSearch(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUsersPage);
