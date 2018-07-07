import React, { Component } from 'react';
import styles from './EditorForm.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class EditorForm extends Component {

  state = {
    file: null,
    imagePreviewUrl: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.originalImageSrc !== this.props.originalImageSrc) {
      this.setState({
        imagePreviewUrl: this.props.originalImageSrc
      });
    }
    if (prevProps.caption !== this.props.caption) {
      this.caption.value = this.props.caption;
    }



  }

  componentWillUnmount() {
    console.log('unmount');
  }

  handleClickImageButton = () => {
    this.imageInput.click();
  }

  handleUpload = async () => {
    const token = await localStorage.getItem('token');

    const image = this.imageInput.files[0];

    const formData = new FormData();

    formData.append('image', image);
    formData.append('caption', this.caption.value);

    const config = {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    try {
      await axios.post(`/gallery/`, formData, config);
      window.location.href = "/";
    } catch (e) {
      console.log(e);
    }
  }

  handleUpdate = async () => {
    const token = await localStorage.getItem('token');
    const image = this.imageInput.files[0];

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', this.caption.value);

    const config = {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    try {
      await axios.put(`/gallery/${this.props.id}/`, formData, config);
      window.location.href = `/image/${this.props.id}`;
    } catch (e) {
      console.log(e);
    }
  }

  _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];


    reader.onloadend = () => {
      // console.log(reader.result);
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }


    // console.log(this.state.imagePreviewUrl);

    reader.readAsDataURL(file)
  }




  render() {
    const { handleClickImageButton, handleUpload, handleUpdate } = this;
    const { isUpdate, caption } = this.props;
    return (
      <div className={cx('editor-form')} >
        <div className={cx('title')}>
          {
            isUpdate ? '사진 수정' : '사진 올리기'
          }
        </div>
        <div className={cx('form-value')}>
          <input
            type="file"
            name="image"
            style={{ display: 'none' }}
            ref={el => this.imageInput = el}
            onChange={this._handleImageChange} />
          <Button
            theme="select-image"
            onClick={handleClickImageButton}>이미지 선택</Button>
          {
            this.state.imagePreviewUrl && (
              <div className={cx('preview')}>
                <img src={this.state.imagePreviewUrl} alt="preview_image" />
              </div>
            )
          }
        </div>
        <div className={cx('form-value')}>
          <div className={cx('label')}>
            이미지 한줄 캡션
          </div>
          <input
            type="text"
            name="caption"
            ref={el => this.caption = el} />
        </div>
        {
          isUpdate ?
            (
              <Button theme="submit" onClick={handleUpdate}>이미지 수정하기</Button>
            ) :
            (
              <Button theme="submit" onClick={handleUpload}>이미지 올리기</Button>
            )
        }
      </div>
    );
  }
}

export default EditorForm;