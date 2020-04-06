/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import InputEdit from '../../../Fields/InputEdit';
import Button from '../../../Fields/Button/index';
import { Link } from 'react-router-dom';
import {
  updateServiceProvider,
  addServiceProvider,
  deleteServiceProvider
} from '../../../../actions/serviceProviders';
import './styles.scss';
import {
  TEXT_TYPE,
  SUBMIT_TYPE,
  VALIDATION_BUTTON,
  TRUE_TEXT,
  MDP_STRING,
  EMAIL_TYPE
} from '../../../../constants/strings';
import {
  BOOKING_SERVICE_PROVIDER_PATH
} from '../../../../constants/routes';
import Modal from '../../../Blocks/Modal';
import {
  setModal,
  setServiceId
} from '../../../../actions/modal';

const required = value => (value ? undefined : 'Champ obligatoire');
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Le mail est invalide' : undefined);

class ServiceProviderFormBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
    this.deleteServiceProvider = this.deleteServiceProvider.bind(this);
    this.cancelDeletion = this.cancelDeletion.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  // ON ADD PICTURE
  onDrop(picture) {
    const {
      pictures
    } = this.state;

    this.setState({
      pictures: pictures.concat(picture)
    });
  }

  // ON SUBMIT
  submit() {
    const {
      pictures
    } = this.state;

    const {
      isEdit,
      isEditProfil
    } = this.props;

    // IF EDIT PROFIL === TRUE
    if (isEditProfil !== 'false') {
      const {
        update,
        users
      } = this.props;

      const profilId = users.id;
      update(profilId, pictures);
    }
    // IF EDIT SERVICEPROVIDER === FALSE
    else if (isEdit === 'false') {
      const {
        add
      } = this.props;

      add(pictures);
    }
    // IF ADD SERVICEPROVIDER
    else {
      const {
        update,
        serviceProvider
      } = this.props;

      const serviceProviderId = serviceProvider.id;
      update(serviceProviderId, pictures);
    }
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

  deleteItem(id) {
    const {
      setOpenModal,
      setId
    } = this.props;
    setOpenModal();
    setId(id);
  }

  cancelDeletion() {
    const { setOpenModal } = this.props;
    setOpenModal();
  }

  render() {
    const {
      handleSubmit,
      submitting,
      errorForm,
      serviceProvider,
      users,
      idService,
      isModalOpen
    } = this.props;

    if (serviceProvider && serviceProvider.img) {
      var divStyle = {
        backgroundImage: 'url(' + serviceProvider.img + ')',
      }
    } else if(users && users.img ) {
      var divStyle = {
        backgroundImage: 'url(' + users.img + ')',
      }
    } else {
      var divStyle = {
        backgroundImage: 'url(https://i.ibb.co/L9zLczz/userType.png)',
      };
    }

    return (
      <div>
        <div className="serviceProviderInit">
          <div className="serviceProviderInit-img" style={divStyle} />
          {(serviceProvider && serviceProvider.firstname && serviceProvider.lastname) && (<p className="serviceProviderInit-text">{serviceProvider.firstname} {serviceProvider.lastname}</p>)}
          {(users && users.firstname && users.lastname) && (<p className="serviceProviderInit-text">{users.firstname} {users.lastname}</p>)}
          {(serviceProvider && serviceProvider.booking && serviceProvider.booking === true) && (<Link className="serviceProviderInit-link" to={BOOKING_SERVICE_PROVIDER_PATH}>Voir ses devis</Link>)}
        </div>
        <form onSubmit={handleSubmit(this.submit.bind(this))} className="form">
          <div className="form-img">
            <div className="form-img-content">
              <div className="imgServiceProvider" style={divStyle} />
              <ImageUploader
                withIcon={false}
                buttonText="Télécharge une image"
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
                className="uploadFile"
              />
            </div>
          </div>
          <div className="form-inputs">
            <div className="form-inputs-item">
              <h2 className="title">Prénom</h2>
              <Field
                name="firstname"
                component={InputEdit}
                placeholder=""
                type={TEXT_TYPE}
                validate={[required]}
              />
            </div>
            <div className="form-inputs-item">
              <h2 className="title">Nom</h2>
              <Field
                name="lastname"
                component={InputEdit}
                placeholder=""
                type={TEXT_TYPE}
                validate={[required]}
              />
            </div>
            <div className="form-inputs-item">
              <h2 className="title">Username</h2>
              <Field
                name="username"
                component={InputEdit}
                placeholder=""
                type={TEXT_TYPE}
                validate={[required]}
              />
            </div>
            <div className="form-inputs-item">
              <h2 className="title">Date de naissance</h2>
              <Field
                name="birthDate"
                component={InputEdit}
                placeholder=""
                type={TEXT_TYPE}
              />
            </div>
            <div className="form-inputs-item">
              <h2 className="title">Sexe</h2>
              <div className="radio">
                <label>
                  <Field
                    name="sexe"
                    component="input"
                    type="radio"
                    value="male"
                  />
                  {' '}
                  Homme
                </label>
                <label>
                  <Field
                    name="sexe"
                    component="input"
                    type="radio"
                    value="female"
                  />
                  {' '}
                  Femme
                </label>
              </div>
            </div>
            <div className="form-inputs-item">
              <h2 className="title">Email</h2>
              <Field
                name="mail"
                component={InputEdit}
                placeholder=""
                type={EMAIL_TYPE}
                validate={[required, email]}
              />
            </div>
            <div className="form-inputs-item">
              <h2 className="title">Mot de passe</h2>
              <Field
                name="password"
                component={InputEdit}
                placeholder=""
                type={MDP_STRING}
              />
            </div>
            <div className="form-inputs-item">
              <h2 className="title">Téléphone</h2>
              <Field
                name="phone"
                component={InputEdit}
                placeholder=""
                type={TEXT_TYPE}
              />
            </div>

            {errorForm && <span>{errorForm}</span>}

            {(serviceProvider) && ( <button className="form-linkDelete" type="button" onClick={() => this.deleteItem(serviceProvider.id)}>Supprimer le compte</button> )}

            <div className="contain-button">
              <Button text={VALIDATION_BUTTON} type={SUBMIT_TYPE} disabled={submitting} isColor={TRUE_TEXT} />
            </div>
          </div>
        </form>
        {(serviceProvider && serviceProvider.id) &&
          (<Modal
            open={isModalOpen}
            message="Êtes-vous sûr(e) de vouloir supprimer ce prestataire ?"
            onSubmit={this.deleteServiceProvider}
            onCancel={this.cancelDeletion}
            id={idService}
          />)}
      </div>
    );
  }
}

ServiceProviderFormBlock.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  update: PropTypes.func,
  add: PropTypes.func,
  isEdit: PropTypes.string,
  errorForm: PropTypes.string,
  isEditProfil: PropTypes.string,
  serviceProvider: PropTypes.shape({}),
  users: PropTypes.shape({}),
  history: PropTypes.shape({}),
  remove: PropTypes.func,
  setOpenModal: PropTypes.func,
  idService: PropTypes.string,
  isModalOpen: PropTypes.bool,
  setId: PropTypes.func
};

const ServiceProvider = reduxForm({
  form: 'ServiceProviderValues',
  enableReinitialize: true
})(ServiceProviderFormBlock);

const mapStateToProps = (state) => {
  const {
    serviceProvidersListData: {
      serviceProviderById: serviceProvider,
      isEdit,
      errorForm
    },
    modal: {
      idService,
      isModalOpen
    },
    usersData: {
      isEdit: isEditProfil,
      users
    }
  } = state;

  // IF IS EDITPROFIL === TRUE
  if (isEditProfil === 'true') {
    return {
      initialValues: users,
      isEditProfil,
      users,
      idService,
      isModalOpen
    };
  }

  // IF ADD
  if (isEdit === 'false') {
    return {
      isEdit,
      isEditProfil
    };
  }

  // IF EDIT SERVICEPROVIDER
  return {
    initialValues: serviceProvider,
    serviceProvider,
    isEditProfil,
    isEdit,
    errorForm,
    idService,
    isModalOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (id, pictures) => dispatch(updateServiceProvider(id, pictures)),
    add: (pictures) => dispatch(addServiceProvider(pictures)),
    setOpenModal: () => dispatch(setModal()),
    remove: (id) => dispatch(deleteServiceProvider(id)),
    setId: (id) => dispatch(setServiceId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ServiceProvider));
