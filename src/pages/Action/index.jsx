import React from 'react';
import { Button, Cascader, Col, Row, Select, Input } from 'antd';
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
    FormSlot,
    FormGridRow,
    FormGridCol,
} from '@uform/antd';

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

const GRADE_OPTIONS = [
    {
        value: 3,
        label: '三年级',
    },
    {
        value: 4,
        label: '四年级',
    },
];

const SUBJECT_OPTIONS = [
    {
        value: 1,
        label: '英语',
    },
    {
        value: 2,
        label: '语文',
    },
    {
        value: 3,
        label: '数学',
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
                    $('onFieldChange', 'switch_pic').subscribe(fieldState => {
                        setFieldState('content_pics', state => {
                            state.visible = !!fieldState.value;
                        });
                    });
                }}
                value={{
                    name: '123132',
                    user_range: 'yigou',
                    content_head_pic: 'http://tosv.byted.org/obj/ev-class-teacher/95d1a1febfb543779d79cbcdfac1dc5d'
                }}
                labelCol={5}
                wrapperCol={14}
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
                                <FormGridRow title='开始时间' gutter={10}>
                                    <FormGridCol>
                                        <FormItemGrid gutter={10}>
                                            <Field
                                                name='start_date'
                                                type='date'
                                            />
                                            <Field
                                                name='start_time'
                                                type='time'
                                            />
                                            <FormLayout
                                                labelCol={10}
                                                wrapperCol={14}
                                            >
                                                <Field
                                                    offset={6}
                                                    name='has_start_limit'
                                                    type='boolean'
                                                    title='倒计时'
                                                    default={true}
                                                />
                                            </FormLayout>
                                        </FormItemGrid>
                                    </FormGridCol>
                                    <FormGridCol>倒计时</FormGridCol>
                                    <Field type='object' name='start_limit'>
                                        <FormTextBox
                                            gutter={10}
                                            text='活动开始前 %s 天 %s 时 %s 分'
                                        >
                                            <Field name='tian' type='number' />
                                            ​<Field name='shi' type='number' />
                                            ​<Field name='fen' type='number' />
                                        </FormTextBox>
                                    </Field>
                                </FormGridRow>

                                <FormItemGrid
                                    title='结束时间'
                                    gutter={10}
                                    cols={[7, 7]}
                                >
                                    <Field name='end_date' type='date' />
                                    <Field name='end_time' type='time' />
                                </FormItemGrid>
                            </Field>
                        </Field>
                        <Field
                            title='用户范围'
                            name='user_range'
                            type='string'
                            x-component='radio'
                            enum={[
                                { label: '按已购班课选择', value: 'yigou' },
                                {
                                    label: '全部用户',
                                    value: 'all',
                                    disabled: true,
                                },
                            ]}
                        />
                        <FormItemGrid gutter={20} cols={[5, 12]}>
                            <FormSlot>
                                <div></div>
                            </FormSlot>
                            <Field
                                name='target_banke_1'
                                type='select_search'
                                required
                                x-rules={[
                                    val => {
                                        if (val.length > 3) {
                                            return '不能超过3个';
                                        }
                                    },
                                ]}
                            />
                        </FormItemGrid>
                        <FormTextBox
                            title='活动顺位'
                            gutter={10}
                            text='第 %s 顺位'
                        >
                            <Field name='sequence_number' type='number' />
                        </FormTextBox>
                    </FormLayout>
                </FormCard>
                <FormCard title='续报信息'>
                    <FormLayout labelCol={5} wrapperCol={14}>
                        <Field type='array' title='续报关系' name='relations'>
                            <Field type='object'>
                                <Field
                                    type='select_search'
                                    title='来源班课'
                                    name='source_banke'
                                    x-props={{
                                        mode: 'multiple',
                                        placeholder: 'Select users',
                                    }}
                                />
                                <Field
                                    type='string'
                                    enum={[{ value: 123, label: '12323' }]}
                                    title='目标班课'
                                    name='target_banke'
                                />
                            </Field>
                        </Field>
                        <Field type='array' title='活动入口图' name='entries'>
                            <Field type='object'>
                                <Field
                                    name='start_time'
                                    type='date'
                                    title='开始时间'
                                    x-props={{
                                        showTime: true,
                                    }}
                                />
                                <Field
                                    name='end_time'
                                    type='date'
                                    title='结束时间'
                                    x-props={{
                                        showTime: true,
                                    }}
                                />
                                <Field
                                    name='pic'
                                    title='图片上传'
                                    type='upload'
                                    x-props={{
                                        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                    }}
                                    x-rules={[
                                        value => console.log(value)
                                    ]}
                                />
                            </Field>
                        </Field>
                    </FormLayout>
                </FormCard>
                <FormCard title='内容设置'>
                    <Field name='content_name' title='活动标题' type='string' />
                    <FormGridRow title='活动图片'>
                        <Field
                            name='content_head_pic'
                            title='活动头图'
                            type='upload_me'
                        />
                        <Field
                            name='content_footer_pic'
                            title='活动尾图'
                            type='upload'
                        />
                        <Field
                            name='switch_pic'
                            title='按年级学科设置'
                            type='boolean'
                        />
                        <Field
                            name='content_pics'
                            type='array'
                            title='活动图片'
                        >
                            <Field name='xxxx' type='object'>
                                <FormItemGrid gutter={20}>
                                    <Field
                                        title='年级'
                                        name='grade'
                                        type='string'
                                        enum={GRADE_OPTIONS}
                                    />
                                    <Field
                                        title='学科'
                                        name='subject'
                                        type='string'
                                        enum={SUBJECT_OPTIONS}
                                    />
                                </FormItemGrid>
                                <Field
                                    name='content_head_pic'
                                    title='活动头图'
                                    type='upload'
                                />
                                <Field
                                    name='content_footer_pic'
                                    title='活动尾图'
                                    type='upload'
                                />
                            </Field>
                        </Field>
                    </FormGridRow>
                    <Field name='questions' type='array' title='常见问题'>
                        <Field type='object'>
                            <Field name='q_title' type='string' />
                            <Field name='q_content' type='textarea' />
                        </Field>
                    </Field>
                    <Field
                        name='content_bg_color'
                        title='背景颜色'
                        type='string'
                        x-props={{
                            placeholder: '请输入色值，格式 #000000'
                        }}
                    />
                    <Field
                        name='content_banke_icon'
                        title='班课标题icon'
                        type='upload'
                    />
                    <Field
                        name='content_q_icon'
                        title='常见问题标题icon'
                        type='upload'
                    />
                    <Field
                        name='content_q_footer_pic'
                        title='常见问题底部icon'
                        type='upload'
                    />
                </FormCard>
                <FormButtonGroup sticky offset={8}>
                    <Submit>提交</Submit>​<Reset>重置</Reset>​
                </FormButtonGroup>
            </SchemaForm>
        </div>
    );
};
