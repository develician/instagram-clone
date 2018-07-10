import React from 'react';
import styles from './NotFound.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const NotFound = () => (
  <div className={cx('wrapper')}>
    <div className={cx('center')}>
      <div className={cx('text')}>
        <div className={cx('bold')}>죄송합니다. 페이지를 사용할 수 없습니다.</div>
        <div className={cx('thin')}>
          클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.
          <Link to={`/`}>Instagram으로 돌아가기.</Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
