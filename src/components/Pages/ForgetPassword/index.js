import React, { Component } from 'react';
import './styles.scss';
import '../../../styles/index.scss';
import Input from '../../Fields/Input/index';
import Button from '../../Fields/Button/index';
import LinkArrow from '../../Fields/LinkArrow/index';
import { APP_PATH } from '../../../constants/routes';
import {
  MDP_TITLE,
  EMAIL_PLACEHOLDER,
  TEXT_TYPE,
  MDP_BUTTON
} from '../../../constants/strings';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-mdp">
        <LinkArrow to={APP_PATH} />
        <div className="content-mdp">
          <form>
            <h1 className="title">{MDP_TITLE}</h1>

            <Input placeholder={EMAIL_PLACEHOLDER} type={TEXT_TYPE} />

            <div className="contain-button">
              <Button to={APP_PATH} setBackground={!false} text={MDP_BUTTON} />
            </div>
          </form>
        </div>
        <div className="bg" />
      </div>
    );
  }
}
export default ForgetPassword;
