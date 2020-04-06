/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import InputEdit from '../../../Fields/InputEdit';
import TextArea from '../../../Fields/TextArea';
import Button from '../../../Fields/Button/index';
import {
  updateRoom,
  addRoom
} from '../../../../actions/rooms';
import {
  getDataListTagsRoom,
  getDataListEquipments
} from '../../../../actions/tags';
import renderRooms from '../../../Fields/addRoomArray/index';
import SimpleSlider from '../../Slider/index';
import renderMultiselect from '../../../Fields/MultiSelect/index';
import 'react-widgets/dist/css/react-widgets.css';
import './styles.scss';
import {
  TEXT_TYPE,
  SUBMIT_TYPE,
  VALIDATION_BUTTON,
  TRUE_TEXT,
  FALSE_TEXT,
  NUMBER_TYPE
} from '../../../../constants/strings';

const required = value => value ? undefined : 'Champ obligatoire';
const number = value => value && isNaN(Number(value)) ? 'Ca doit être un nombre' : undefined;
const minValue = min => value => value && value < min ? `Il faut en sélectionner au moins ${min}` : undefined;
const minValue1 = minValue(1);
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Le mail est invalide' : undefined;

class RoomFormBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount() {
    const {
      tagsRoomListData,
      equipmentsListData
    } = this.props;

    tagsRoomListData();
    equipmentsListData();
  }

  // ON ADD PICTURE
  onDrop(picture) {
    const {
      pictures
    } = this.state;

    const last = picture[picture.length - 1];

    picture = [];

    picture.push(last);

    this.setState({
      pictures: picture
    })
  }

  // ON SUBMIT
  submit() {
    const {
      isEdit
    } = this.props;

    const {
      pictures
    } = this.state;

    if (isEdit !== 'false') {
      const {
        update,
        room
      } = this.props;

      const roomId = room.id;

      update(roomId, pictures);
    } else {
      const {
        addRoom: add
      } = this.props;
      add(pictures);
    }
  }

  render() {
    const {
      room,
      handleSubmit,
      submitting,
      tagsRoom,
      equipments,
      errorForm
    } = this.props;
    const { pictures } = this.state;

    const tagsRoomList = (tagsRoom || []).map((item) => (
      {
        id: item.id,
        tagName: item.tagName
      }
    ));

    const equipmentsList = (equipments || []).map((item) => (
      {
        id: item.id,
        tagName: item.tagName
      }
    ));

    if (room && room.images && room.images.small) {
      var divStyle = {
        backgroundImage: 'url(' + room.images.small + ')',
      }
    }
    return (
      <div>
        <form onSubmit={(handleSubmit(this.submit.bind(this)))} className="contain-form">
          <div>
            <h2 className="contain-form-title">Tags</h2>
            <Field
              name="tags"
              component={renderMultiselect}
              data={tagsRoomList}
              validate={[required, minValue1]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Image mise en avant</h2>
            <ImageUploader
              withIcon={false}
              buttonText="Télécharge une image"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png']}
              maxFileSize={5242880}
              withPreview={false}
              singleImage={true}
              className="uploadFile"
              validate={required}
            />
            <div>Nom de l'image : {pictures && pictures[0] && pictures[0].name}</div>
            {room && room.images && room.images.small && divStyle && <div className="imgRoom" style={divStyle} />}
          </div>

          <SimpleSlider images={room && room.images && room.images.carousel || []} title="Photos" />

          <div>
            <h2 className="contain-form-title">Titre</h2>
            <Field
              name="title"
              component={InputEdit}
              placeholder=""
              ismap={FALSE_TEXT}
              type={TEXT_TYPE}
              validate={[required]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Ma description</h2>
            <Field
              name="description"
              component={TextArea}
              placeholder=""
              type={TEXT_TYPE}
              ismap={FALSE_TEXT}
            />
          </div>

          <FieldArray name="room.capacityRoom" component={renderRooms} />

          <div>
            <h2 className="contain-form-title">Couchages</h2>
            <div className="contain-inputs">
              <div className="contain-input">
                <p>Simple</p>
                <Field
                  name="dormitory.capacityDormitory[0].bedAvailability"
                  component={InputEdit}
                  placeholder=""
                  isMap={FALSE_TEXT}
                  type="number"
                  validate={[number, required]}
                />
              </div>

              <div className="contain-input">
                <p>Double</p>
                <Field
                  name="dormitory.capacityDormitory[1].bedAvailability"
                  component={InputEdit}
                  placeholder=""
                  isMap={FALSE_TEXT}
                  type="number"
                  validate={[number, required]}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="contain-form-title">Environnement</h2>
            <Field
              name="room.descriptionRoom"
              component={TextArea}
              placeholder=""
              isMap={FALSE_TEXT}
              type={TEXT_TYPE}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Restauration</h2>
            <Field
              name="caterer.descriptionCaterer"
              component={TextArea}
              placeholder=""
              isMap={FALSE_TEXT}
              type={TEXT_TYPE}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Prestataires</h2>
            <Field
              name="caterer.descriptionServiceProvider"
              component={TextArea}
              placeholder=""
              isMap={FALSE_TEXT}
              type={TEXT_TYPE}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Tarifs</h2>
            <div className="contain-inputs">
              <div className="contain-input">
                <p>Par personne</p>
                <Field
                  name="price.perPerson"
                  component={InputEdit}
                  placeholder=""
                  isMap={FALSE_TEXT}
                  type={TEXT_TYPE}
                  validate={[required]}
                />
              </div>

              <div className="contain-input">
                <p>Salle vide</p>
                <Field
                  name="price.room"
                  component={InputEdit}
                  placeholder=""
                  isMap={FALSE_TEXT}
                  type={TEXT_TYPE}
                  validate={[required]}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="contain-form-title">Equipements</h2>
            <Field
              name="equipments"
              component={renderMultiselect}
              data={equipmentsList}
              validate={[required, minValue1]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Localisation</h2>
            <Field
              name="address"
              component={InputEdit}
              placeholder=""
              isMap={TRUE_TEXT}
              type={TEXT_TYPE}
              validate={[required]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Code</h2>
            <Field
              name="zipcode"
              component={InputEdit}
              placeholder=""
              isMap={FALSE_TEXT}
              type={NUMBER_TYPE}
              validate={[required]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Ville</h2>
            <Field
              name="city"
              component={InputEdit}
              placeholder=""
              isMap={FALSE_TEXT}
              type={TEXT_TYPE}
              validate={[required]}
            />
          </div>

          <div>
            <h2 className="contain-form-title">Email</h2>
            <Field
              name="email"
              component={InputEdit}
              placeholder=""
              isMap={FALSE_TEXT}
              type={TEXT_TYPE}
              validate={[required, email]}
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

RoomFormBlock.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  addRoom: PropTypes.func,
  room: PropTypes.shape({}),
  history: PropTypes.shape({}),
  isEdit: PropTypes.string,
  errorForm: PropTypes.string,
  update: PropTypes.func,
  tagsRoom: PropTypes.arrayOf(PropTypes.shape({})),
  equipments: PropTypes.arrayOf(PropTypes.shape({})),
  tagsRoomListData: PropTypes.func,
  equipmentsListData: PropTypes.func
};

const UpdateRoom = reduxForm({
  form: 'RoomValues',
  enableReinitialize: true
})(RoomFormBlock);

const mapStateToProps = (state) => {
  const {
    roomsListData: {
      roomById: room,
      isEdit,
      errorForm
    },
    tagsData: {
      tagsRoom,
      equipments
    }
  } = state;

  // IF EDIT ROOM === FALSE
  if (isEdit === 'false') {
    return {
      isEdit,
      tagsRoom,
      equipments,
      errorForm
    };
  }
  // IF EDIT ROOM === TRUE
  return {
    initialValues: room,
    room,
    tagsRoom,
    isEdit,
    equipments,
    errorForm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (id, pictures) => dispatch(updateRoom(id, pictures)),
    tagsRoomListData: () => dispatch(getDataListTagsRoom()),
    equipmentsListData: () => dispatch(getDataListEquipments()),
    addRoom: (pictures) => dispatch(addRoom(pictures))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateRoom));
