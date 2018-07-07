import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import * as postActions from 'store/modules/post';
import EditorForm from 'components/editor/EditorForm/EditorForm';
import queryString from 'query-string';

class EditorContainer extends Component {

    state = {
        selectedImage: null,
        isUpdate: false,
        id: ''
    };

    initialize = () => {
        const { PostActions } = this.props;
        this.setState({
            selectedImage: null
        });
        PostActions.initialize();

    }

    componentDidMount() {
        this.initialize();
        const { location } = this.props;
        this.checkLogged();
        // window.addEventListener('beforeunload', this.handleBeforeUnload, false);
        const { id } = queryString.parse(location.search);
        if (id) {
            this.setState({
                isUpdate: true,
                id: id
            });
            this.getPostDetail({ id });
        }
    }

    getPostDetail = async ({ id }) => {
        const { PostActions } = this.props;
        const token = await localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        try {
            await PostActions.getPostDetail({ image_id: id }, config);
            // console.log(this.props.post.toJS());
            // this.setState({
            //     selectedImage: this.props.post.toJS().image
            // });
        } catch (e) {
            console.log(e);
        }
    }


    // handleBeforeUnload = (e) => {
    //     console.log('before unload');
    //     var confirmationMessage = "\o/";

    //     e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    //     return confirmationMessage;
    // }



    componentWillUnmount() {
        // console.log
        // this.handleBeforeUnload();
        // window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    checkLogged = async () => {
        const logged = localStorage.getItem('logged');
        if (!logged || logged !== 'true') {
            alert("로그인 후 사용해주세요.");
            window.location.href = "/login";
            return;
        }

        const { BaseActions } = this.props;
        BaseActions.setLogged();
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await BaseActions.checkLogged(config);
        } catch (e) {
            localStorage.removeItem("logged");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            alert("로그인 후 사용해주세요.");
            window.location.href = "/login";
        }
    }

  

    render() {
        const { image, caption } = this.props.post.toJS();
        const { isUpdate } = this.state;
        return (
            <EditorForm
                id={this.state.id}
                caption={caption}
                originalImageSrc={image}
                isUpdate={isUpdate} />
        );
    }
}

export default connect(
    (state) => ({
        post: state.post.get('post')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch),
    })
)(withRouter(EditorContainer));