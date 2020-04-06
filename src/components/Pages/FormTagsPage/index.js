import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
import PropTypes from 'prop-types';
import TagFormBlock from '../../Blocks/FormsBlock/TagFormBlock';
import {
  isEditTag,
  getDataListTagById
} from '../../../actions/tags';

class FormTagsPage extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentWillMount() {
    const {
      id,
      tagById,
      editTag,
      history: {
        location: {
          pathname
        }
      }
    } = this.props;

    const params = pathname.split('/');

    if (params.length === 4) {
      tagById(id);
      editTag('true');
    } else {
      editTag('false');
    }
  }

  render() {
    const {
      role
    } = this.props;

    if (role === 'serviceProvider') {
      return null;
    }

    return (
      <div className="updateTag container">
        <TagFormBlock />
      </div>
    );
  }
}

FormTagsPage.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({}),
  tagById: PropTypes.func,
  editTag: PropTypes.func,
  history: PropTypes.shape({}),
  role: PropTypes.string
};

const mapStateToProps = (state) => {
  const {
    usersData: {
      users: {
        role
      }
    },
    tagsData: {
      tagById: tag
    }
  } = state;

  return {
    tag,
    role
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tagById: (id) => dispatch(getDataListTagById(id)),
    editTag: (value) => dispatch(isEditTag(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormTagsPage));
