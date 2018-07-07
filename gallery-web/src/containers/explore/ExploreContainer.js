import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as userActions from 'store/modules/user';
import SuggestWrapper from 'components/home/SuggestWrapper';
import SuggestForm from 'components/home/SuggestForm';

class ExploreContainer extends Component {

    componentDidMount() {
        this.exploreUsers();
    }

    exploreUsers = async () => {
        const { UserActions } = this.props;

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.exploreUsers(config);
        } catch (e) {
            console.log(e);
        }
    }

    handleFollowUser = async ({ id }) => {
        const { UserActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.followUser({ user_id: id }, config);
            this.setFollow({ id });
        } catch (e) {
            console.log(e);
        }
    }

    handleUnfollowUser = async ({ id }) => {
        const { UserActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.unfollowUser({ user_id: id }, config);
            this.setUnfollow({ id });
        } catch (e) {
            console.log(e);
        }
    }

    setFollow = ({ id }) => {
        const { UserActions } = this.props;
        UserActions.setSuggestionFollow({ id });
    }

    setUnfollow = ({ id }) => {
        const { UserActions } = this.props;
        UserActions.setSuggestionUnfollow({ id });
    }

    render() {
        const { suggestionList } = this.props;
        const { handleFollowUser, handleUnfollowUser } = this;
        return (
            <SuggestWrapper>
                <SuggestForm
                    suggestionList={suggestionList}
                    onFollowUser={handleFollowUser}
                    onUnfollowUser={handleUnfollowUser} />
            </SuggestWrapper>
        );
    }
}


export default connect(
    (state) => ({
        suggestionList: state.user.get('suggestionList')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(withRouter(ExploreContainer));