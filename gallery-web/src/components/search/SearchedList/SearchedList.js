import React from 'react';
import styles from './SearchedList.scss';
import classNames from 'classnames/bind';
import SearchedUserProfile from 'components/search/SearchedUserProfile';

const cx = classNames.bind(styles);

const SearchedList = ({userList}) => (
  <div className={cx('list-form')}>
  {
    userList.toJS().length > 0 ? (
      <SearchedUserProfile userList={userList}/>
    ) : (
      <div className={cx('description')}>
        찾으시는 회원이 없습니다.
      </div>
    )
  }
    
  </div>
);

export default SearchedList;