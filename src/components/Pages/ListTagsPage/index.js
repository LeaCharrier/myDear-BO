/* eslint-disable class-methods-use-this */
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
  deleteTag,
  getDataListTags,
  getDataTagsCat,
  getDataTagsListSearch
} from '../../../actions/tags';
import Modal from '../../Blocks/Modal';
import {
  setModal,
  setServiceId
} from '../../../actions/modal';
import {
  TAG_UPDATE_PATH,
  TAG_ADD_PATH
} from '../../../constants/routes';


class ListTagsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deleteTag = this.deleteTag.bind(this);
    this.cancelDeletion = this.cancelDeletion.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
    const {
      tagsListData,
      tagsNameCat
    } = this.props;

    tagsListData();
    tagsNameCat();
  }

  onChange(value) {
    const {
      tagsListSearch
    } = this.props;

    tagsListSearch(value);
  }

  deleteTag() {
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
      tags,
      role
    } = this.props;

    if (role === 'serviceProvider') {
      return null;
    }

    if (!tags) {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100"
        />
      );
    }

    if (tags && tags.length === 0) {
      return (
        <div className="container notFoundContent">
          <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
          <TabBlock isButton="true" to={TAG_ADD_PATH} name="tags" />

          <div className="notFound">
            <p>Il n’y a aucun résultat à afficher</p>
          </div>
        </div>
      );
    }
    return (
      <div className="container containTags">
        <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
        <TabBlock isButton="true" to={TAG_ADD_PATH} name="tags" />
        <div className="containTags-content">
          {tags && tags.map((item, key) => (
            <Card
              data={item || {}}
              onDelete={() => this.deleteItem(item.id)}
              key={key}
              link={`${TAG_UPDATE_PATH}/${item.id}`}
              type="tags"
            />
          ))
          }
          <Modal
            open={isModalOpen}
            message="Êtes-vous sûr(e) de vouloir supprimer cette salle ?"
            onSubmit={this.deleteTag}
            onCancel={this.cancelDeletion}
            id={idService}
          />
        </div>
      </div>
    );
  }
}

ListTagsPage.propTypes = {
  tagsListData: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape({})),
  remove: PropTypes.func,
  setOpenModal: PropTypes.func,
  idService: PropTypes.string,
  setId: PropTypes.func,
  isModalOpen: PropTypes.bool,
  tagsListSearch: PropTypes.func,
  tagsNameCat: PropTypes.func,
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
      tags
    },
    modal: {
      idService,
      isModalOpen
    }
  } = state;

  return {
    tags,
    idService,
    isModalOpen,
    role
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tagsListData: () => dispatch(getDataListTags()),
    tagsNameCat: () => dispatch(getDataTagsCat()),
    remove: (id) => dispatch(deleteTag(id)),
    setOpenModal: () => dispatch(setModal()),
    setId: (id) => dispatch(setServiceId(id)),
    tagsListSearch: (value) => dispatch(getDataTagsListSearch(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTagsPage);
