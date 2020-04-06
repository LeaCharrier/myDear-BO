/* eslint-disable */
import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';
import { updateDataCarousel, updateImagesToUpload } from '../../../actions/rooms';
import DeleteLink from '../../Fields/DeleteLink';
import './styles.scss';

const getNbSlides = ({ length }) => length === 0 ? 0 : length >= 3 ? 3 : 1;

class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictures) {
    const {
      updateImagesToUpload
    } = this.props;


    updateImagesToUpload(pictures);
  }

  render() {
    const {
      carousel,
      updateDataCarousel
    } = this.props;

    const nbrSlide = getNbSlides(carousel);

    const settings = {
      dots: true,
      arrow: true,
      infinite: true,
      speed: 500,
      slidesToShow: nbrSlide,
      slidesToScroll: 1,
      infinite: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    const onDelete = (carousel, index) => {
      carousel.splice(index, 1);
      this.setState({
        nbrSlide: getNbSlides(carousel)
      });

      updateDataCarousel(carousel);
    }

    return (
      <div>
        <div className="sliderRoom">
          <div className="sliderRoom-content">
            <h2 className="contain-form-title">Images du slider</h2>
            <ImageUploader
              withIcon={false}
              buttonText="Télécharge des images"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png']}
              maxFileSize={5242880}
              withPreview={true}
              className="uploadFile"
            />
          </div>
        </div>
        <Slider {...settings}>
          {carousel && (carousel || [])
            .filter(item => typeof item  === 'string')
            .map((item, index) => (
              <div key={index} className="imgSlider">
                <img src={`${item}`} alt="" />
                <DeleteLink addClassSlider="yes" onDelete={() => onDelete(carousel, index)} />
              </div>
            ))}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    roomsListData: {
      carousel
    }
  } = state;

  return {
    carousel
  };
};

const actions = {
  updateDataCarousel,
  updateImagesToUpload
}

export default connect(mapStateToProps, actions)(SimpleSlider);
