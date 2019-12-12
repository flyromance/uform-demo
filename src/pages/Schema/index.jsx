import React from 'react';
import { SchemaForm } from '@uform/antd';

const schemaData = {
    type: 'object',
    properties: {
        radio: {
            type: 'radio',
            enum: ['1', '2', '3', '4'],
            title: 'Radio',
        },
        select: {
            type: 'string',
            enum: ['1', '2', '3', '4'],
            title: 'Select',
            required: true,
        },
    },
};

export default function Schema() {
    return (
        <div>
            <SchemaForm schema={schemaData} />
        </div>
    );
}
