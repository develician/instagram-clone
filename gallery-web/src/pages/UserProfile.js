import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import UserProfileContainer from 'containers/profile/UserProfileContainer';
import FollowModalContainer from 'containers/modal/FollowModalContainer';
import FollowingModalContainer from 'containers/modal/FollowingModalContainer';

const UserProfile = ({match}) => {
    const { username } = match.params;
    // console.log(username);
    return (
        <PageTemplate>
            <UserProfileContainer username={username} />
            <FollowModalContainer username={username} />
            <FollowingModalContainer username={username} />
        </PageTemplate> 
    );
};

export default UserProfile;