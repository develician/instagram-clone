import React from 'react';
import styles from './PostModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';
import CloseIcon from 'react-icons/lib/md/clear';

const cx = classNames.bind(styles);

const PostModal = ({visible, hidePostModal, onRemovePost, onUpdateClick}) => (
  <ModalWrapper visible={visible}>
    <div className={cx('post-modal')}>
      <div className={cx('close-button')}>
        <CloseIcon 
          className={cx('icon')}
          onClick={hidePostModal}/>
      </div>
      <div className={cx('description')}>
        포스트를 수정 혹은 삭제하시겠습니까?
      </div>     
      <div className={cx('buttons')}>
        <Button theme="post-update" onClick={onUpdateClick}>
          수정하기
        </Button>
        <Button theme="post-remove" onClick={onRemovePost}>
          삭제하기
        </Button>
      </div> 
    </div>
  </ModalWrapper>
);

export default PostModal;