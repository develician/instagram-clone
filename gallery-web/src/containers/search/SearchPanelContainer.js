import React, { Component } from 'react';
import SearchPanel from 'components/search/SearchPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import onClickOutside from "react-onclickoutside";


class SearchPanelContainer extends Component {

    handleClickOutside = (e) => {
        this.hideSearchPanel();
    }

    hideSearchPanel = () => {
        const { BaseActions } = this.props;
        BaseActions.hideSearchPanel();
    }

    linkToProfile = ({ username }) => {
        this.props.history.push(`/user/${username}`);
    }


    render() {
        const { visible, userList } = this.props;
        const { hideSearchPanel, linkToProfile } = this;
        if (userList.toJS().length === 0) {
            return null;
        }
        return (
            <SearchPanel
                visible={visible}
                userList={userList}
                onHide={hideSearchPanel}
                onLink={linkToProfile} />
        );
    }
}


export default connect(
    (state) => ({
        visible: state.base.get('searchPanelVisible'),
        userList: state.search.get('userList')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(onClickOutside(SearchPanelContainer)));