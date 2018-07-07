import React, { Component } from 'react';
import styles from './LoginForm.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class LoginForm extends Component {

  handleChange = (e) => {
    const { value, name } = e.target;
    const { onChangeInput } = this.props;
    onChangeInput({ value, name });
  }

  render() {

    const { username, password, onLogin, error, errorMessage, onKeypress } = this.props;

    const { handleChange } = this;

    return (
      <div className={cx('login-form')}>
        <Link to="/" className={cx('logo')}>
          Instagram
        </Link>
        {
          error && (
            <div className={cx('error')}>
              {errorMessage}
            </div>
          )
        }
        <div className={cx('form-inputs')}>
          {/* <div className={cx('label')}>
            ID
          </div> */}
          <div className={cx('input')}>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="전화번호, 사용자 이름 또는 이메일"
              />
          </div>
        </div>
        <div className={cx('form-inputs')}>
          {/* <div className={cx('label')}>
            Password
          </div> */}
          <div className={cx('input')}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              onKeyPress={onKeypress}
              placeholder="비밀번호" />
          </div>
        </div>
        <div className={cx('submit')}>
          <Button theme="login" onClick={onLogin}>로그인</Button>
        </div>
        {/* <div className={cx('description')}>
          Not Registered Yet? <Link to="/register">Go To Register</Link>
        </div> */}

      </div >
    );
  }
}

export default LoginForm;
