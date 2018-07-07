import React from 'react';
import styles from './SuggestForm.scss';
import classNames from 'classnames/bind';
import SuggestList from 'components/home/SuggestList';

const cx = classNames.bind(styles);

const SuggestForm = ({ suggestionList, onFollowUser, onUnfollowUser }) => {
  return (
    <div className={cx('suggest-form')}>
      <SuggestList 
        suggestionList={suggestionList}
        onFollowUser={onFollowUser}
        onUnfollowUser={onUnfollowUser} />
    </div>
  );
}

export default SuggestForm;