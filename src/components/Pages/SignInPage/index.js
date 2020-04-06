import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import '../../../styles/index.scss';
import SignIn from '../../Blocks/FormsBlock/SignInFormBlock/index';

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-connexion">
        <div className="content-connexion">
          <SignIn />
        </div>
        <div className="bg" />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return { };
};

export default connect(mapStateToProps, null)(SignInPage);
