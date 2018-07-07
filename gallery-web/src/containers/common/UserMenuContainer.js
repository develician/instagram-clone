import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import * as userActions from 'store/modules/user';
import UserMenu from 'components/common/UserMenu';
import UserMenuItem from 'components/common/UserMenuItem';
import onClickOutside from 'react-onclickoutside';

class UserMenuContainer extends Component {

    handleClickOutside = (e) => {
        const { BaseActions } = this.props;
        BaseActions.hideProfileMenu();
    }

    handleClickFileInput = () => {
        this.profile_image.click();
    }

    handleChangeFile = async (e) => {
        // console.log(e.target.files[0]);
        const selectedFile = e.target.files[0];
        const token = await localStorage.getItem('token');
        const username = await localStorage.getItem('username');

        const formData = await new FormData();
        await formData.append('profile_image', selectedFile);

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
        const { visible } = this.props;
        const { handleClickFileInput, handleChangeFile } = this;
        if(!visible) {
            return null;
        }
        return (
            <UserMenu>
                <UserMenuItem onClick={handleClickFileInput}>썸네일 변경</UserMenuItem>
                <input 
                    type="file" 
                    name="profile_image" 
                    style={{display: 'none'}}
                    ref={el => this.profile_image = el}
                    onChange={handleChangeFile} />
            </UserMenu>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['profileMenu', 'visible'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(onClickOutside(UserMenuContainer));