import React, { Component } from 'react';
import SearchForm from 'components/search/SearchForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as searchActions from 'store/modules/search';
import SearchedList from 'components/search/SearchedList';

class SearchContainer extends Component {

    componentDidMount() {
        this.initialize();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.username !== this.props.username) {
            if(this.props.username.trim() === "") {
                this.initialize();
            }
        }
    }

    initialize = () => {
        const { SearchActions } = this.props;
        SearchActions.initialize();
    }

    handleChangeUsername = ({value}) => {
        const { SearchActions } = this.props;
        SearchActions.changeUsername({value});
    }

    searchUser = async () => {
        const { SearchActions, username } = this.props;

        const token = await localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        try {
            await SearchActions.searchUser({username}, config);
        } catch(e) {
            console.log(e);
        }
    }

    handleKeypress = (e) => {
        if(e.key === 'Enter') {
            this.searchUser();
        }
    }

    render() {
        const { handleChangeUsername, searchUser, handleKeypress } = this;
        const { username, userList } = this.props;
        return (
            <React.Fragment>
                <SearchForm 
                    username={username}
                    onChangeUsername={handleChangeUsername}
                    onSearchUser={searchUser}
                    onKeypress={handleKeypress} />
                {
                    // <SearchedList />
                    this.props.searched && <SearchedList userList={userList} />
                }
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => ({
        username: state.search.get('username'),
        userList: state.search.get('userList'),
        searched: state.search.get('searched')
    }),
    (dispatch) => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(withRouter(SearchContainer));