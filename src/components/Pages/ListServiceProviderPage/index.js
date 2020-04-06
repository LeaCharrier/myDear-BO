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
  getDataListServiceProviders,
  deleteServiceProvider,
  getDataServiceProvidersListSearch
} from '../../../actions/serviceProviders';
import {
  setModal,
  setServiceId
} from '../../../actions/modal';
import {
  SERVICE_PROVIDER_UPDATE_PATH,
  ADD_SERVICEPROVIDER_PATH
} from '../../../constants/routes';

class ListServiceProviderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.deleteServiceProvider = this.deleteServiceProvider.bind(this);
    this.cancelDeletion = this.cancelDeletion.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
    const { serviceProvidersListData } = this.props;
    serviceProvidersListData();
  }

  onChange(value) {
    const {
      serviceProvidersListSearch
    } = this.props;

    serviceProvidersListSearch(value);
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
      serviceProviders,
      isModalOpen,
      idService,
      role
    } = this.props;

    if (role === 'serviceProvider') {
      return null;
    }

    if (!serviceProviders) {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100"
        />
      );
    }

    if (serviceProviders && serviceProviders.length === 0) {
      return (
        <div className="container notFoundContent">
          <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
          <TabBlock isButton="true" to={ADD_SERVICEPROVIDER_PATH} name="serviceProvider" />

          <div className="notFound">
            <p>Il n’y a aucun résultat à afficher</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
        <TabBlock isButton="true" to={ADD_SERVICEPROVIDER_PATH} name="serviceProvider" />
        <div className="listServiceProviders">
          {serviceProviders
            .filter(item => item.role === 'serviceProvider')
            .map((item, key) => (
              <Card
                data={item}
                key={key}
                onDelete={() => this.deleteItem(item.id)}
                link={`${SERVICE_PROVIDER_UPDATE_PATH}/${item.id}`}
                type="serviceProvider"
              />
            ))
          }
          <Modal
            open={isModalOpen}
            message="Êtes-vous sûr(e) de vouloir supprimer ce prestataire ?"
            onSubmit={this.deleteServiceProvider}
            onCancel={this.cancelDeletion}
            id={idService}
          />
        </div>
      </div>
    );
  }
}

ListServiceProviderPage.propTypes = {
  serviceProviders: PropTypes.arrayOf(PropTypes.shape({})),
  serviceProvidersListData: PropTypes.func,
  remove: PropTypes.func,
  setOpenModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
  idService: PropTypes.string,
  setId: PropTypes.func,
  serviceProvidersListSearch: PropTypes.func,
  role: PropTypes.string
};

const mapStateToProps = (state) => {
  const {
    usersData: {
      users: {
        role
      }
    },
    serviceProvidersListData: {
      serviceProviders
    },
    modal: {
      idService,
      isModalOpen
    }
  } = state;

  return {
    serviceProviders,
    idService,
    isModalOpen,
    role
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    serviceProvidersListData: () => dispatch(getDataListServiceProviders()),
    remove: (id) => dispatch(deleteServiceProvider(id)),
    setOpenModal: () => dispatch(setModal()),
    setId: (id) => dispatch(setServiceId(id)),
    serviceProvidersListSearch: (value) => dispatch(getDataServiceProvidersListSearch(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListServiceProviderPage);
