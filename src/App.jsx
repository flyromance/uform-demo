import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
} from 'react-router-dom';
import { matchPath } from 'react-router';
window.matchPath = matchPath;
import Sider from './component/Sider';
import routes from './routes';

import './app.css';
import 'antd/dist/antd.css';

import './fields';

const WrapperSider = withRouter(Sider);

function User1(props) {
    return <div>this is {props.match.params.username}</div>;
}

function User(props) {
    return <div>
        Hello this is user page!!
        <Route path={'/user/:username'} component={User1} />
    </div>;
}

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
                        <Route path='/user' component={User} />
                        <Switch>
                            {routes.map(
                                ({ path, component, exact, ...rest }) => {
                                    return (
                                        <Route
                                            key={path}
                                            exact={true}
                                            path={path}
                                            component={component}
                                        />
                                    );
                                }
                            )}
                        </Switch>
                    </div>
                </div>
                <div className='p-header'>footer</div>
            </div>
        </Router>
    );
}
