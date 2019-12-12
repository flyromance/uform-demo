import React from 'react';

import { 
    SchemaForm,
    Field,
} from '@uform/antd';

export default function List() {
    return (
        <SchemaForm
            onSubmit={(v) => { console.log(v); }}
            labelCol={7} wrapperCol={12}
        >
            <Field
                type='array'
                name='xxx'
                maxItems={3}
                title='数组'
                name='array'
                x-props={{
                    renderAddition: () => <div>添加</div>,
                    renderRemove: () => <div>删除</div>,
                    renderMoveDown: () => <div>下移</div>,
                    renderMoveUp: () => <div>上移</div>,
                    // renderExtraOperations: () => (
                    //     <div>通过渲染函数做完全内容定制</div>
                    // ),
                    // operationsWidth: 300, //控制操作区域宽度，只针对x-component="table"时生效
                }}
            >
                <Field type='object' name='xxx'>
                    <Field
                        type='number'
                        title='xxxx'
                        name='number'
                    />
                </Field>
            </Field>
        </SchemaForm>
    );
}
