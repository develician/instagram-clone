import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ImageDetailContainer from 'containers/detail/ImageDetailContainer';
import PostModalContainer from 'containers/modal/PostModalContainer';
import CommentModalContainer from 'containers/modal/CommentModalContainer';

const ImageDetail = ({match}) => {
    const image_id = match.params.id;
    // console.log(image_id);
    return (
        <PageTemplate>
            <ImageDetailContainer image_id={image_id} />
            <PostModalContainer image_id={image_id}/>
            <CommentModalContainer />
        </PageTemplate>
    );
};

export default ImageDetail;