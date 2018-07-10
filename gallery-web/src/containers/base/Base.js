import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import ProfileModalContainer from 'containers/modal/ProfileModalContainer';
import SearchPanelContainer from 'containers/search/SearchPanelContainer';

class Base extends Component {
  componentDidMount() {
    this.checkLogged();
  }

  checkLogged = async () => {
    const logged = localStorage.getItem('logged');
    if (!logged || logged !== 'true') {
      localStorage.removeItem('logged');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      this.props.history.push('/');
      return;
    }

    const { BaseActions } = this.props;
    BaseActions.setLogged();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    try {
      await BaseActions.checkLogged(config);
    } catch (e) {
      localStorage.removeItem('logged');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      // this.props.history.push('/login');
      this.props.history.push('/');
      // console.log('not logged');
    }
  };

  render() {
    const { hideProfileModal } = this;
    return (
      <React.Fragment>
        <ProfileModalContainer />
        <SearchPanelContainer />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(withRouter(Base));
