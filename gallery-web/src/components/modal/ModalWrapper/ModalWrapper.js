import React, { Component } from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

class ModalWrapper extends Component {

  state = {
    animate: false
  };

  startAnimation = () => {
    // animate 값을 true 로 설정 후
    this.setState({
      animate: true
    });
    // 250ms 이후 다시 false 로 설정
    setTimeout(() => {
      this.setState({
        animate: false
      });
    }, 250)
  }

  render() {
    const { children, visible, hideProfileModal } = this.props;
    if(!visible) {
      return null;
    }
    return (  
      <React.Fragment>
        <div className={cx('gray-background')} onClick={hideProfileModal}/>
        <div className={cx('modal-wrapper')}>
          <div className={cx('modal')}>
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ModalWrapper;