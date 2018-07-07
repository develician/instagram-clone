import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as authActions from 'store/modules/auth';
import * as baseActions from 'store/modules/base';
import * as searchActions from 'store/modules/search';
import PageHeader from 'components/common/PageHeader';

const $ = window.$;

class PageHeaderContainer extends Component {

    state = {
        resizeHeader: false,
        isMobile: false
    };

    componentDidMount() {
        $(window).scroll(() => {
            if($(window).scrollTop() > 200) {
                this.setState({
                    resizeHeader: true
                });
            } else {
                this.setState({
                    resizeHeader: false
                });
            }
        });

        $(window).resize(() => {
            if($(window).width() <= 768) {
                this.setState({
                    isMobile: true
                });
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.username !== this.props.username && this.props.username.trim().length > 0) {
            this.showSearchPanel();
            this.handleSearch();
        } 
        if(prevProps.username !== this.props.username && this.props.username.trim().length === 0) {
            this.hideSearchPanel();
        }    
    }

    handleLogout = async () => {
        const { AuthActions } = this.props;
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        }

        try {
            await AuthActions.logout(config);
            await localStorage.clear();
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    }

    goToUpload = () => {
        window.location.href = "/editor";
    }

    goToMyPage = () => {
        const username = localStorage.getItem('username');
        this.props.history.push(`/user/${username}/`);
    }

    showSearchPanel = () => { 
        const { BaseActions } = this.props;
        BaseActions.showSearchPanel();
    }

    hideSearchPanel = () => { 
        const { BaseActions } = this.props;
        BaseActions.hideSearchPanel();
    }

    handleSearchChange = ({value}) => { 
        const { SearchActions } = this.props;
        SearchActions.changeUsername({value});
        
    }

    handleSearch = async () => {
        const { SearchActions, username } = this.props;
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        };
        
        try {   
            await SearchActions.searchUser({username}, config);
        } catch(e) {    
            console.log(e);
        }
    }

    render() {
        const { logged } = this.props;
        const { resizeHeader, isMobile } = this.state;
        const { handleLogout, 
                goToUpload, 
                goToMyPage, 
                showSearchPanel, 
                hideSearchPanel,
                handleSearchChange } = this;

        return (
            <PageHeader
                isMobile={isMobile}
                resizeHeader={resizeHeader}
                goToUpload={goToUpload}
                logged={logged}
                onLogout={handleLogout}
                goToMyPage={goToMyPage}
                showSearchPanel={showSearchPanel}
                hideSearchPanel={hideSearchPanel}
                onSearchChange={handleSearchChange} />
        );
    }
}

export default connect(
    (state) => ({
        logged: state.base.get('logged'),
        username: state.search.get('username')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch),
        SearchActions: bindActionCreators(searchActions, dispatch),
    })
)(withRouter(PageHeaderContainer));