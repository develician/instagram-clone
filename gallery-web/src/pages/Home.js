import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import HomeContainer from 'containers/home/HomeContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class Home extends React.Component {
    render() {
        const { logged } = this.props;
        return (
            <PageTemplate logged={logged}>
                <HomeContainer />
            </PageTemplate>
        );
    }
    
};

export default connect(
    (state) => ({
        logged: state.base.get('logged')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
    })
)(withRouter(Home));