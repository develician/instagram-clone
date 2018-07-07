import React, { Component } from 'react';
import styles from './PageHeader.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import LogoIcon from 'react-icons/lib/fa/instagram';
import ExploreIcon from 'react-icons/lib/md/explore';
import HeartIcon from 'react-icons/lib/fa/heart-o';
import UserIcon from 'react-icons/lib/fa/user';

const cx = classNames.bind(styles);

class PageHeader extends Component {



  render() {
    const { logged, 
            onLogout, 
            goToUpload, 
            goToMyPage, 
            resizeHeader, 
            isMobile,
            showSearchPanel,
            hideSearchPanel,
            onSearchChange } = this.props;

    const handleChange = (e) => {
      const { value } = e.target;
      onSearchChange({value});
    };

    return (
      <div className={cx('page-header')}>
        <div className={cx('logo-line')} style={{height: resizeHeader ? '3.2rem' : '5rem'}}>
          <div className={cx('logo')}>
            <div className={cx('icon')}>
              <LogoIcon />
            </div>
            <div className={cx('v-line')} style={{display: isMobile ? 'none' : resizeHeader ? 'none' : 'block'}} />
            <Link to="/" className={cx('text')} style={{display:  isMobile ? 'none' : resizeHeader ? 'none' : 'block'}}>
              Instagram
            </Link>
          </div>
          <div className={cx('search')}>
            <div className={cx('input-cover')}>
              <input type="text" name="search" onChange={handleChange} />
            </div>
          </div>
          <div className={cx('menus')}>
            <Link to='/explore' className={cx('icon')}>
              <ExploreIcon />
            </Link>
            <Link to="/" className={cx('icon')}>
              <HeartIcon />
            </Link>
            <Link to={`/user/${localStorage.getItem('username')}`} className={cx('icon')}>
              <UserIcon />
            </Link>
          </div>
        </div>
        {/* <div className={cx('menu-line')}>

          {
            logged ? (
              [
                <Link to="/" key="home" className={cx('menu')}>
                  Home
                </Link>,
                <Link to="/search" key="search" className={cx('menu')}>
                  Search
                </Link>,
                <div key="upload" onClick={goToUpload} className={cx('menu')}>
                  Upload
                </div>,
                <div key="mypage" onClick={goToMyPage} className={cx('menu')}>
                  MyPage
                </div>,
                <div key="logout" onClick={onLogout} className={cx('menu')}>
                  Logout
                </div>
              ]
            ) :
              (
                <Link to="/login" className={cx('menu')}>
                  Login / Register
                </Link>
              )
          }
        </div> */}
      </div>
    );
  }
}

export default PageHeader;