/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import InputEdit from '../../../Fields/InputEdit';
import Button from '../../../Fields/Button/index';
import {
  updateUser,
  addUser,
  deleteUser
} from '../../../../actions/users';
import './styles.scss';
import {
  TEXT_TYPE,
  SUBMIT_TYPE,
  VALIDATION_BUTTON,
  TRUE_TEXT,
  MDP_STRING
} from '../../../../constants/strings';
import Modal from '../../../Blocks/Modal';
import {
  setModal,
  setServiceId
} from '../../../../actions/modal';

const required = value => value ? undefined : 'Champ obligatoire';
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Le mail est invalide' : undefined;

class UserFormBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.deleteUser = this.deleteUser.bind(this);
    this.cancelDeletion = this.cancelDeletion.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  // ON SUBMIT
  submit() {
    const {
      isEdit
    } = this.props;

    if (isEdit !== 'false') {
      const {
        update,
        user
      } = this.props;

      const userId = user.id;

      update(userId);
    } else {
      const {
        add
      } = this.props;

      add();
    }
  }

  // DELETE USER
  deleteUser() {
    const {
      idService,
      remove,
      setOpenModal
    } = this.props;

    remove(idService);
    setOpenModal();
  }

  // SET PARAM TO MODAL
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
      user,
      isModalOpen,
      idService
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.submit.bind(this))} className="contain-form">
          <div>
            <h2 className="contain-form-title">Prénom</h2>
            <Field
              name="firstname"
              component={InputEdit}
              placeholder="Sarah"
              type={TEXT_TYPE}
              validate={[required]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Nom</h2>
            <Field
              name="lastname"
              component={InputEdit}
              placeholder="Lepas"
              type={TEXT_TYPE}
              validate={[required]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Email</h2>
            <Field
              name="email"
              component={InputEdit}
              placeholder="sarah@gmail.com"
              type={TEXT_TYPE}
              validate={[required, email]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Mot de passe</h2>
            <Field
              name="password"
              component={InputEdit}
              placeholder=""
              type={MDP_STRING}
            />
          </div>

          {errorForm && <span>{errorForm}</span>}

          {(user) && ( <button className="form-linkDelete" type="button" onClick={() => this.deleteItem(user.id)}>Supprimer le compte</button> )}
          <div className="contain-button">
            <Button text={VALIDATION_BUTTON} type={SUBMIT_TYPE} disabled={submitting} isColor={TRUE_TEXT} />
          </div>
        </form>
        {(user && user.id) &&
          (<Modal
            open={isModalOpen}
            message="Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?"
            onSubmit={this.deleteUser}
            onCancel={this.cancelDeletion}
            id={idService}
          />)}
      </div>
    );
  }
}

UserFormBlock.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  update: PropTypes.func,
  add: PropTypes.func,
  isEdit: PropTypes.string,
  serviceProvider: PropTypes.shape({}),
  history: PropTypes.shape({}),
  user: PropTypes.shape({}),
  errorForm: PropTypes.string,
  remove: PropTypes.func,
  setOpenModal: PropTypes.func,
  idService: PropTypes.string,
  isModalOpen: PropTypes.string,
  setId: PropTypes.func
};

const UpdateUser = reduxForm({
  form: 'UserValues',
  enableReinitialize: true
})(UserFormBlock);

const mapStateToProps = (state) => {
  const {
    usersListData: {
      usersById: user,
      isEdit,
      errorForm
    },
    modal: {
      idService,
      isModalOpen
    },
  } = state;

  // IF EDIT USER === FALSE & ADD USER
  if (isEdit === 'false') {
    return {
      isEdit,
      errorForm
    };
  }
  // IF EDIT USER === TRUE
  return {
    initialValues: user,
    user,
    isEdit,
    errorForm,
    idService,
    isModalOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (id) => dispatch(updateUser(id)),
    add: () => dispatch(addUser()),
    setOpenModal: () => dispatch(setModal()),
    remove: (id) => dispatch(deleteUser(id)),
    setId: (id) => dispatch(setServiceId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateUser));
