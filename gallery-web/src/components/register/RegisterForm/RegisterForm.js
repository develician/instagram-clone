import React, {Component} from 'react';
import styles from './RegisterForm.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class RegisterForm extends Component {
  
  handleChange = (e) => {
    const { value, name } = e.target;
    const { onChangeInput } = this.props;
    onChangeInput({value, name});
  }

  render() {

    const { username, 
            name, 
            email, 
            password1, 
            password2,
            onRegister,
            error,
            errorMessage,
            onKeypress } = this.props;
    
    const { handleChange } = this;

    return (
      <div className={cx('login-form')}>
        <Link to="/" className={cx('logo')}>
          Instagram
        </Link>
        <div className={cx('leading')}>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </div>
        {
          error && (
            <div className={cx('error')}>
              {errorMessage}
            </div>
          )
        }
        <div className={cx('form-inputs')}>
          {/* <div className={cx('label')}>
            Your ID
          </div> */}
          <div className={cx('input')}>
            <input 
              placeholder="아이디"
              type="text" 
              name="username"
              value={username}
              onChange={handleChange} />
          </div>
        </div>
        <div className={cx('form-inputs')}>
          {/* <div className={cx('label')}>
            Your email
          </div> */}
          <div className={cx('input')}>
            <input 
              placeholder="이메일 주소"
              type="email" 
              name="email"
              value={email}
              onChange={handleChange} />
          </div>
        </div>
        <div className={cx('form-inputs')}>
          {/* <div className={cx('label')}>
            Your name
          </div> */}
          <div className={cx('input')}>
            <input 
              placeholder="사용자 이름"
              type="text" 
              name="name"
              value={name}
              onChange={handleChange} />
          </div>
        </div>
        <div className={cx('form-inputs')}>
          {/* <div className={cx('label')}>
            Your Password
          </div> */}
          <div className={cx('input')}>
            <input 
              placeholder="비밀번호"
              type="password" 
              name="password1"
              value={password1}
              onChange={handleChange} />
          </div>
        </div>
        <div className={cx('form-inputs')}>
          {/* <div className={cx('label')}>
            Check Password
          </div> */}
          <div className={cx('input')}>
            <input 
              placeholder="비밀번호 확인"
              type="password" 
              name="password2"
              value={password2}
              onChange={handleChange}
              onKeyPress={onKeypress} />
          </div>
        </div>
        <div className={cx('submit')}>
          <Button theme="register" onClick={onRegister}>가입</Button>
        </div>
        {/* <div className={cx('description')}>
          Already Registered? <Link to="/login">Go To Login</Link>
        </div> */}
        
      </div>
    );
  }
}

export default RegisterForm;