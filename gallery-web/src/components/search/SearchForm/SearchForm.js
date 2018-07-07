import React from 'react';
import styles from './SearchForm.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class SearchForm extends React.Component {

  handleChange = (e) => {
    const { value } = e.target;
    const { onChangeUsername } = this.props;
    onChangeUsername({ value });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.username !== this.props.username && this.props.username.length > 0 && 
      this.props.username.trim() !== "") {

      this.props.onSearchUser();
    }
  }

  render() {
    const { onSearchUser, username, onKeypress } = this.props;
    const { handleChange } = this;
    return (
      <div className={cx('search-form')}>
        <div className={cx('description')}>
          유저 검색
        </div>
        <div className={cx('search-bar')}>
          <input
            type="text"
            name="search"
            value={username}
            onChange={handleChange}
            onKeyPress={onKeypress} />
          <div className={cx('button')}>
            <Button onClick={onSearchUser}>검색하기</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;