import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Input from '../../../Fields/Input';
import Button from '../../../Fields/Button/index';
import { getDataUsers } from '../../../../actions/user';
import ModalPassword from '../../ModalPassword/index';
import './styles.scss';
import {
  CONNEXION_BUTTON,
  MDP_PLACEHOLDER,
  TEXT_TYPE,
  SUBMIT_TYPE,
  MAIL_STRING,
  MDP_STRING,
  TRUE_TEXT
} from '../../../../constants/strings';

const required = value => (value ? undefined : 'Champ obligatoire');

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpened: false
    };
    this.onCancel = this.onCancel.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  onCancel() {
    this.setState({
      isModalOpened: false
    });
  }

  openModal() {
    this.setState({
      isModalOpened: true
    });
  }

  submit() {
    const {
      email,
      password,
      userData
    } = this.props;

    userData(email, password);
  }

  render() {
    const {
      handleSubmit,
      submitting,
      errorForm
    } = this.props;

    const { isModalOpened } = this.state;

    return (
      <div className="signIn">
        <form onSubmit={handleSubmit(this.submit.bind(this))}>
          <h1 className="title">Bienvenue</h1>
          <div>
            <Field
              name={MAIL_STRING}
              component={Input}
              placeholder="Username"
              type={TEXT_TYPE}
              onChange={this.handleChange}
              validate={[required]}
            />
          </div>
          <div>
            <Field
              name={MDP_STRING}
              component={Input}
              placeholder={MDP_PLACEHOLDER}
              type={MDP_STRING}
              validate={[required]}
            />
          </div>

          {errorForm && <span>{errorForm}</span>}

          <Button text={CONNEXION_BUTTON} type={SUBMIT_TYPE} disabled={submitting} isColor={TRUE_TEXT} />

          <button className="link" onClick={this.openModal} type="button">Mot de passe oublié ?</button>
        </form>

        <ModalPassword
          open={isModalOpened}
          message="Si vous avez oublié votre mot de passe, veuillez contacter contact@mydear.com"
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  errorForm: PropTypes.string,
  userData: PropTypes.func,
  history: PropTypes.shape({})
};

const SignIn = reduxForm({
  form: 'SignInValues',
  enableReinitialize: true
})(SignInForm);

const mapStateToProps = (state) => {
  const values = getFormValues('SignInValues')(state) || {};
  const {
    usersData: {
      errorForm
    }
  } = state;
  return {
    errorForm,
    ...values
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userData: bindActionCreators(getDataUsers, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
