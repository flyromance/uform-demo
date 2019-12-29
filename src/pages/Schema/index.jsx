import React from 'react';
import { SchemaForm } from '@uform/antd';

const schemaData = {
    type: 'object',
    properties: {
        radio: {
            type: 'radio',
            enum: ['1', '2', '3', { label: '44', value: '4' }],
            title: 'Radio',
        },
        checkbox: {
            type: 'checkbox',
            enum: ['1', '2', '3', '4'],
            title: 'checkbox',
            // required: true,
        },
        select: {
            type: 'string',
            enum: ['1', '2', '3', '4'],
            title: 'Select',
            // required: true,
        },
        textarea: {
            type: 'string',
            'x-component': 'textarea',
            // required: true,
            title: 'textarea',
            'x-props': {
                placeholder: 'xxxx'
            },
            'x-component-props': {
                placeholder: 'xxxxxxx', // 这个优先级高
            },
        },
        number: {
            type: 'number',
            // required: true,
            title: 'number',
        },
        boolean: {
            type: 'boolean',
            // required: true,
            title: 'boolean',
        },
        date: {
            type: 'date',
            // required: true,
            title: '日期选择',
        },
        daterange: {
            type: 'daterange',
            title: '日期范围',
        },
        year: {
            type: 'year',
            title: '年',
        },
        time: {
            type: 'time',
            title: '时间',
        },
        upload1: {
            type: 'upload',
            title: '上传',
            'x-props': {
                listType: 'dragger',
            },
        },
        upload2: {
            type: 'upload',
            title: '上传',
            'x-props': {
                listType: 'card',
            },
        },
        upload3: {
            type: 'upload',
            title: '上传',
            'x-props': {
                listType: 'text',
            },
        },
        range: {
            type: 'range',
            'x-props': {
                min: 0,
                max: 1024,
                marks: [0, 1024],
            },
            title: '范围选择',
        },
        layout_btn_group1: {
            type: 'object',
            'x-component': 'button-group',
            'x-component-props': {
                offset: 7,
                sticky: true,
            },
            properties: {
                submit_btn: {
                    type: 'object',
                    'x-component': 'submit',
                    'x-component-props': {
                        children: '提交',
                    },
                },
                reset_btn: {
                    type: 'object',
                    'x-component': 'reset',
                    'x-component-props': {
                        children: '重置',
                    },
                },
            },
        },
    },
};

export default function Schema() {
    return (
        <div>
            <SchemaForm schema={schemaData} onSubmit={(v) => { console.log(v) }}/>
        </div>
    );
}
