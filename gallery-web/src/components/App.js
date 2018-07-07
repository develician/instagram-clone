import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    Home,
    Search,
    Register,
    Login,
    MyPage,
    Editor,
    ImageDetail,
    UserProfile,
    Explore,
    NotFound
} from 'pages';
import Base from 'containers/base/Base';

const App = () => {
    return (
        <React.Fragment>
            <Switch>
            <Route exact path="/" component={Home}/>
            {/* <Route path="/search" component={Search}/> */}
            <Route path="/register" component={Register}/>
            {/* <Route path="/login" component={Login}/> */}
            <Route path="/mypage" component={MyPage}/>
            <Route path="/editor" component={Editor}/>
            <Route path="/explore" component={Explore}/>
            <Route path="/image/:id" component={ImageDetail}/>
            <Route path="/user/:username" component={UserProfile}/>
            <Route component={NotFound}/>
            </Switch>
            <Base />
        </React.Fragment>
    );
};

export default App;