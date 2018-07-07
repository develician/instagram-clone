import React from 'react';
import styles from './CommentModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';

const cx = classNames.bind(styles);

const CommentModal = ({ visible, hideCommentModal, showClearIcon }) => (
  <ModalWrapper visible={visible}>
    <div className={cx('comment-modal')}>
      <div className={cx('menu')} onClick={showClearIcon}>
        댓글 삭제
      </div>
      <div className={cx('menu')} onClick={hideCommentModal}>
        닫기
      </div>
    </div>
  </ModalWrapper>
);

export default CommentModal;