import React from 'react';
import { Button, Cascader, Col, Row } from 'antd';
// import { registerFormField, Field } from '@uform/react';
import {
    FormPath,
    registerFormField,
    Field,
    SchemaForm,
    FormCard,
    FormBlock,
    connect,
    Submit,
    Reset,
    FormButtonGroup,
    FormItemGrid,
    FormLayout,
    FormTextBox,
} from '@uform/antd';

import Xme from '../../component/Xme';

registerFormField(
    'cascader',
    connect()(props => <Cascader {...props} value={props.value || ''} />)
);

// registerFormField(
//     'upload',
//     connect()(props => <Xme {...props} value={props.value} />)
// );

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

export default () => {
    return (
        <div style={{ margin: '0 20px' }}>
            <SchemaForm
                defaultValue={{
                    activity_type: ['zhengjiang', 'hangzhou', 'xihu'],
                }}
                onSubmit={values => console.log(values)}
                effects={($, { setFieldState, getFieldState }) => {
                    $('onFieldChange', 'times.*.has_start_limit').subscribe(
                        fieldState => {
                            const { name, path } = fieldState;
                            const preName = name.slice(
                                0,
                                name.lastIndexOf('.')
                            );
                            setFieldState(`${preName}.start_limit`, state => {
                                state.visible = !!fieldState.value;
                            });
                            // setFieldState(`${preName}.has_end_limit`, state => {
                            //     state.value = !fieldState.value;
                            // });
                        }
                    );
                    $('onFieldChange', 'times.*.has_end_limit').subscribe(
                        fieldState => {
                            const { name, path } = fieldState;
                            const preName = name.slice(
                                0,
                                name.lastIndexOf('.')
                            );
                            setFieldState(`${preName}.end_limit`, state => {
                                state.visible = !!fieldState.value;
                            });
                        }
                    );
                    $('onFieldChange', 'user_range').subscribe(fieldState => {
                        setFieldState('user_range_banke', state => {
                            state.visible = fieldState.value !== 'all';
                        });
                    });
                }}
                value={{
                    name: '123132',
                    user_range: 'yigou',
                }}
            >
                <FormCard title='基本信息'>
                    <FormLayout labelCol={5} wrapperCol={14}>
                        <Field
                            title='活动类型'
                            x-props={{ options }}
                            name='activity_type'
                            type='cascader'
                        />
                        <Field title='活动名称' name='name' type='string' />
                        <Field
                            type='array'
                            title='活动时间'
                            name='times'
                            x-component='cards'
                        >
                            <Field type='object'>
                                <FormItemGrid
                                    title='开始时间'
                                    gutter={10}
                                    cols={[7, 7]}
                                >
                                    <Field name='start_date' type='date' />
                                    <Field name='start_time' type='time' />
                                    <FormLayout labelCol={10} wrapperCol={14}>
                                        <Field
                                            offset={6}
                                            name='has_start_limit'
                                            type='boolean'
                                            title='倒计时'
                                            default={true}
                                        />
                                    </FormLayout>
                                </FormItemGrid>
                                <Field type='object' name='start_limit'>
                                    <FormTextBox
                                        title='倒计时'
                                        gutter={10}
                                        text='活动开始前 %s 天 %s 时 %s 分'
                                    >
                                        <Field name='tian' type='number' />
                                        ​<Field name='shi' type='number' />
                                        ​<Field name='fen' type='number' />
                                    </FormTextBox>
                                </Field>
                                <FormItemGrid
                                    title='结束时间'
                                    gutter={10}
                                    cols={[7, 7]}
                                >
                                    <Field name='end_date' type='date' />
                                    <Field name='end_time' type='time' />
                                    <FormLayout labelCol={10} wrapperCol={14}>
                                        <Field
                                            name='has_end_limit'
                                            type='boolean'
                                            title='倒计时'
                                            default={true}
                                        />
                                    </FormLayout>
                                </FormItemGrid>
                                <Field type='object' name='end_limit'>
                                    <FormTextBox
                                        title='倒计时'
                                        gutter={10}
                                        text='活动开始前 %s 天 %s 时 %s 分'
                                    >
                                        <Field name='tian' type='number' />
                                        ​<Field name='shi' type='number' />
                                        ​<Field name='fen' type='number' />
                                    </FormTextBox>
                                </Field>
                            </Field>
                        </Field>
                        <Field
                            title='用户范围'
                            name='user_range'
                            type='string'
                            x-component='radio'
                            enum={[
                                { label: '按已购班课选择', value: 'yigou' },
                                { label: '全部用户', value: 'all' },
                            ]}
                        />
                        <Field
                            title='目标班课1'
                            name='target_banke_1'
                            type='string'
                        />
                        <Field
                            title='目标班课2'
                            name='target_banke_3'
                            type='string'
                        />
                    </FormLayout>
                </FormCard>
                <FormCard title='续保信息'>
                    <FormLayout labelCol={5} wrapperCol={14}>
                        <Field
                            type='string'
                            title='来源班课'
                            name='source_banke'
                        />
                        <Field
                            type='string'
                            title='活动入口图'
                            name='pic'
                            x-component='upload'
                        />
                    </FormLayout>
                </FormCard>
                <FormCard title='内容设置'></FormCard>
                <FormButtonGroup sticky offset={8}>
                    <Submit>提交</Submit>​ <Reset>重置</Reset>​
                </FormButtonGroup>
            </SchemaForm>
        </div>
    );
};
