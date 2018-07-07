import React from 'react';
import styles from './ImageList.scss';
import classNames from 'classnames/bind';
import ImageForm from 'components/home/ImageForm';

const cx = classNames.bind(styles);

const ImageList = ({ posts, likePost, unlikePost }) => {
  const imageArray = posts.toJS().map((post, index) => {
    return (
      <ImageForm
        id={post.id}
        username={post.owner.username}
        profile_image={post.owner.profile_image}
        caption={post.caption}
        image={post.image}
        comments={post.comments}
        likePost={likePost}
        unlikePost={unlikePost}
        is_liked={post.is_liked}
        key={post.id} />
    )
  })
  return (
    <div className={cx('image-list')}>
      {
        imageArray
      }
    </div>
  );
}

export default ImageList;