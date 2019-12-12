import React from 'react';
import { Link } from 'react-router-dom';

const nav = [
    {
        path: '/simple',
        label: 'simple',
        children: [
            {
                path: '/simple/1',
                label: 'xxx'
            }
        ],
    },
    {
        path: '/list',
        label: 'list',
        children: [],
    },
    {
        path: '/schema',
        label: 'schema',
        children: [],
    },
    {
        path: '/action',
        label: 'action',
        children: [],
    },
];

function renderNav(data, curPathname) {
    if (!data || !data.length) return null;
    return (
        <ul>
            {data.map((item, index) => {
                const { label, path, children } = item;

                return (
                    <li key={index}>
                        <Link
                            to={path}
                            className={path === curPathname ? 'active' : ''}
                        >
                            {label}
                        </Link>
                        {renderNav(children, curPathname)}
                    </li>
                );
            })}
        </ul>
    );
}

export default class Sider extends React.Component {
    render() {
        const { location, history, match } = this.props;
        const { pathname } = location;
        return renderNav(nav, pathname);
    }
}
