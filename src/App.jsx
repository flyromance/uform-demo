import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
} from 'react-router-dom';

import Sider from './component/Sider';
import Home from './pages/Home';
import Simple from './pages/Simple';
import List from './pages/List';
import Schema from './pages/Schema';
import Action from './pages/Action';

import './app.css';
import 'antd/dist/antd.css';

const WrapperSider = withRouter(Sider);

export default function App() {
    return (
        <Router>
            <div className='p-layout'>
                <div className='p-header'>header</div>
                <div className='p-body'>
                    <div className='p-sider'>
                        <WrapperSider aa />
                    </div>
                    <div className='p-content'>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/simple' component={Simple} />
                            <Route exact path='/list' component={List} />
                            <Route exact path='/schema' component={Schema} />
                            <Route exact path='/action' component={Action} />
                            <Route>
                                {props => {
                                    return (
                                        <div>
                                            {props.location.pathname} not
                                            exists;
                                        </div>
                                    );
                                }}
                            </Route>
                        </Switch>
                    </div>
                </div>
                <div className='p-header'>footer</div>
            </div>
        </Router>
    );
}
