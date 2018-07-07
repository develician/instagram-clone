import React from 'react';
import styles from './LeadForm.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const LeadForm = () => (
  <div className={cx('form')}>
    <div className={cx('text')}>
      계정이 없으신가요? <Link to="/register">가입하기</Link>
    </div>
  </div>
);

export default LeadForm;