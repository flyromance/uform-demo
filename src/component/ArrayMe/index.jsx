import React from 'react';
import { Button } from 'antd';
import {
    registerFormField,
    SchemaField,
    FormPath,
} from '@uform/react-schema-renderer';

export default props => {
    const { value = [], path, mutators } = props;

    const EmptyUI = (
        <Button
            onClick={() => {
                mutators.push();
            }}
        >
            Add Element
        </Button>
    );

    const ListUI = value.map((item, index) => {
        return (
            <div key={index}>
                <SchemaField path={FormPath.parse(path).concat(index)} />
                <Button
                    onClick={() => {
                        mutators.remove(index);
                    }}
                >
                    remove
                </Button>
                <Button
                    onClick={() => {
                        mutators.moveDown(index);
                    }}
                >
                    move down
                </Button>
                <Button
                    onClick={() => {
                        mutators.moveUp(index);
                    }}
                >
                    move up
                </Button>
            </div>
        );
    });

    return value.length === 0 ? EmptyUI : ListUI;
};
