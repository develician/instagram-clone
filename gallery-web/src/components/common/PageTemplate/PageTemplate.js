import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import PageFooter from 'components/common/PageFooter';
import PageHeaderContainer from 'containers/common/PageHeaderContainer';

const cx = classNames.bind(styles);

const PageTemplate = ({children, logged}) => (
  <div className={cx('page-template')}>
    {
      (logged || localStorage.getItem('token')) && <PageHeaderContainer />
    }
    <main>
      {children}
    </main>
    {/* <PageFooter /> */}
  </div>
);

export default PageTemplate;