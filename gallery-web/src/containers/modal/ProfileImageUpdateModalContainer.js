import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';
import { bindActionCreators } from 'redux';
import ProfileImageUpdateModal from 'components/modal/ProfileImageUpdateModal';

class ProfileImageUpdateModalContainer extends Component {
  hideProfileImageModal = () => {
    const { BaseActions } = this.props;
    BaseActions.hideUpdateProfileImageModal();
  };
  render() {
    const { hideProfileImageModal } = this;
    const { visible } = this.props;
    return <ProfileImageUpdateModal visible={visible} onHide={hideProfileImageModal} />;
  }
}

export default connect(
  state => ({
    visible: state.base.get('profileImageModalVisible'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(ProfileImageUpdateModalContainer);
