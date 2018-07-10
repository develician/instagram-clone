import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import AccountEditContainer from 'containers/account/AccountEditContainer';
import ProfileImageUpdateModalContainer from 'containers/modal/ProfileImageUpdateModalContainer';

const AccountEdit = () => {
  return (
    <PageTemplate>
      <AccountEditContainer />
      <ProfileImageUpdateModalContainer />
    </PageTemplate>
  );
};

export default AccountEdit;
