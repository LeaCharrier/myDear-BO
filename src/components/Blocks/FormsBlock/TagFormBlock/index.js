/* eslint-disable no-confusing-arrow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import InputEdit from '../../../Fields/InputEdit';
import Button from '../../../Fields/Button/index';
import { updateTag, addTag } from '../../../../actions/tags';
import './styles.scss';
import {
  TEXT_TYPE,
  SUBMIT_TYPE,
  VALIDATION_BUTTON,
  TRUE_TEXT
} from '../../../../constants/strings';

const required = value => value ? undefined : 'Champ obligatoire';

class TagFormBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  submit() {
    const {
      isEdit
    } = this.props;

    if (isEdit !== 'false') {
      const {
        update,
        tag
      } = this.props;

      const tagId = tag.id;

      update(tagId);
    } else {
      const {
        add
      } = this.props;

      add();
    }
  }

  render() {
    const {
      handleSubmit,
      submitting,
      errorForm
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.submit.bind(this))} className="contain-form">
          <div>
            <h2 className="contain-form-title">Nom</h2>
            <Field
              name="tagName"
              component={InputEdit}
              placeholder=""
              type={TEXT_TYPE}
              validate={[required]}
            />
          </div>
          <div>
            <h2 className="contain-form-title">Categorie</h2>
            <Field
              name="categoryName"
              component={InputEdit}
              placeholder=""
              type={TEXT_TYPE}
              validate={[required]}
            />
          </div>

          {errorForm && <span>{errorForm}</span>}

          <div className="contain-button">
            <Button text={VALIDATION_BUTTON} type={SUBMIT_TYPE} disabled={submitting} isColor={TRUE_TEXT} />
          </div>
        </form>
      </div>
    );
  }
}

TagFormBlock.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  update: PropTypes.func,
  add: PropTypes.func,
  isEdit: PropTypes.string,
  errorForm: PropTypes.string,
  tag: PropTypes.shape({}),
  history: PropTypes.shape({})
};

const Tag = reduxForm({
  form: 'TagValues',
  enableReinitialize: true
})(TagFormBlock);

const mapStateToProps = (state) => {
  const {
    tagsData: {
      tagById: tag,
      isEdit,
      errorForm
    }
  } = state;

  // IF EDIT TAG === FALSE && ADD TAG
  if (isEdit === 'false') {
    return {
      isEdit,
      errorForm
    };
  }

  // IF EDIT TAG === TRUE
  return {
    initialValues: tag,
    tag,
    isEdit,
    errorForm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (id) => dispatch(updateTag(id)),
    add: () => dispatch(addTag())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tag));
