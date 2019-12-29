import Home from './pages/Home';
import Simple from './pages/Simple';
import List from './pages/List';
import Schema from './pages/Schema';
import Action from './pages/Action';
import Native from './pages/Native';
import CoreForm from './pages/Core/Form';
import CoreField from './pages/Core/Field';
import React from './pages/React';
import Dnd from './pages/Dnd';

const routes = [
    {
        path: '/core',
        children: [
            {
                exact: true,
                path: '/core/form',
                component: CoreForm,
            },
            {
                exact: true,
                path: '/core/field',
                component: CoreField,
            }
        ]
    },
    {
        path: '/dnd',
        component: Dnd,
    },
    {
        path: '/react',
        component: React,
    },
    {
        path: '/',
        component: Home,
    },
    {
        path: '/simple',
        component: Simple,
    },
    {
        path: '/list',
        component: List,
    },
    {
        path: '/schema',
        component: Schema,
    },
    {
        path: '/action',
        component: Action,
    },
    {
        path: '/native',
        component: Native,
    }
];

export default routes;