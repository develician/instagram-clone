import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import * as commentActions from 'store/modules/comment';
import CommentModal from 'components/modal/CommentModal';

class CommentModalContainer extends Component {

    showClearIcon = () => {
        const { CommentActions } = this.props;
        CommentActions.showClearIcon();
        this.hideCommentModal();
    }

    hideClearIcon = () => {
        const { CommentActions } = this.props;
        CommentActions.hideClearIcon();
    }

    hideCommentModal = () => {
        const { BaseActions } = this.props;
        BaseActions.hideCommentModal();
    }

    render() {
        const { visible } = this.props;
        const { hideCommentModal, showClearIcon } = this;
        return (
            <CommentModal
                visible={visible}
                hideCommentModal={hideCommentModal}
                showClearIcon={showClearIcon} />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.get('commentModalVisible'),
        // following: state.user.get('following'),
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        CommentActions: bindActionCreators(commentActions, dispatch),
    })
)(withRouter(CommentModalContainer));