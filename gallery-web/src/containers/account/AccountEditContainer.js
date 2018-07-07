import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import AccountEditWrapper from 'components/account/AccountEditWrapper';
import AccountEditForm from 'components/account/AccountEditForm';
import * as baseActions from 'store/modules/base';
import * as userActions from 'store/modules/user';
import * as accountActions from 'store/modules/account';

class AccountEditContainer extends Component {

    componentDidMount() {
        this.getUserProfile();
    }

    getUserProfile = async () => {
        const { UserActions } = this.props;
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.getUserProfile({username}, config);
        } catch(e) {
            console.log(e);
        }
    }

    handleSelect = ({ selection }) => {
        const { BaseActions } = this.props;
        BaseActions.updateSelection({ selection });
    }

    handleChange = ({ name, value }) => {
        const { AccountActions } = this.props;
        AccountActions.changeInput({ name, value });
    }


    handleChangeFile = async ({formData}) => {
        const token = await localStorage.getItem('token');
        const username = await localStorage.getItem('username');
    
        const config = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const { UserActions } = this.props;
    
        try {
            await UserActions.changeUserProfileImage({username}, formData, config);
            window.location.reload();
        } catch(e) {
            console.log(e); 
        }
      }

    render() {
        const { handleSelect, handleChange, handleChangeFile } = this;
        const { selection, profile } = this.props;
        const { username, name, email } = this.props.input.toJS();
        return (
            <AccountEditWrapper>
                <AccountEditForm
                    profile={profile}
                    onChange={handleChange}
                    username={username}
                    name={name}
                    email={email}
                    onSelect={handleSelect}
                    selection={selection}
                    onChangeFile={handleChangeFile} />
            </AccountEditWrapper>
        );
    }
}

export default connect(
    (state) => ({
        selection: state.base.get('selection'),
        input: state.account.get('input'),
        profile: state.user.get('profile'),
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        AccountActions: bindActionCreators(accountActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        
    })
)(withRouter(AccountEditContainer));