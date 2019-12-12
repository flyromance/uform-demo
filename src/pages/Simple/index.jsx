import React from 'react';
import {
    SchemaForm,
    Field,
    FormButtonGroup,
    Submit,
    Reset,
    FormPath,
    FormLayout,
    FormBlock,
    FormCard,
    FormItemGrid,
    createFormActions,
    FormSlot,
    FormTextBox,
} from '@uform/antd';
import { Button } from 'antd';

const actions = createFormActions;

export default function Simple() {
    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <SchemaForm
                onSubmit={v => console.log(v)}
                labelCol={7}
                wrapperCol={12}
            >
                <Field
                    type='radio'
                    enum={[{ value: '1', label: 'xxx' }, '2', '3', '4']}
                    title='Radio'
                    name='radio'
                />
                <FormBlock title='基础信息'>
                    <FormSlot>
                        <div>这是一个随意插入的内容</div>
                    </FormSlot>
                </FormBlock>
                <FormCard title='card'>
                    <FormSlot>
                        <div>这是一个随意插入的内容</div>
                    </FormSlot>
                </FormCard>

                <Field
                    type='string'
                    enum={['1', '2', '3', '4']}
                    required
                    title='Select'
                    name='select'
                    x-props={{ style: { maxWidth: 300 } }}
                />
                <Field
                    type='checkbox'
                    enum={['1', '2', '3', '4']}
                    required
                    title='Checkbox'
                    name='checkbox'
                    x-props={{ style: { maxWidth: 300 } }}
                />
                <Field
                    type='string'
                    title='TextArea'
                    name='textarea'
                    x-component='textarea'
                />
                <Field
                    type='number'
                    title='Number'
                    name='number'
                    // x-component='textarea'
                />
                <Field
                    type='upload'
                    title='拖拽上传文件'
                    name='upload2'
                    x-props={{ listType: 'dragger' }}
                />
                <Field
                    type='range'
                    title='范围选择'
                    name='range'
                    x-props={{ min: 0, max: 1024, marks: [0, 1024] }}
                />
                <FormItemGrid gutter={10} cols={[6, 11]} title='sssss'>
                    ​
                    <Field
                        name='ddd1'
                        default={123}
                        type='number'
                        title='xxxx'
                    />
                    ​<Field name='[startDate,endDate]' type='daterange' />​
                </FormItemGrid>
                <FormButtonGroup offset={7} sticky>
                    <Submit />
                    <Reset />
                    <Button
                        onClick={() => {
                            actions.setFieldState('upload', state => {
                                state.value = [
                                    {
                                        downloadURL:
                                            '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png',
                                        imgURL:
                                            '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png',
                                        name: 'doc.svg',
                                    },
                                ];
                            });
                        }}
                    >
                        上传文件
                    </Button>
                    <Button
                        onClick={() => {
                            actions.setFormState(state => {
                                state.values = {
                                    radio: '4',
                                    checkbox: ['2', '3'],
                                };
                            });
                        }}
                    >
                        改变radio的值
                    </Button>
                </FormButtonGroup>
            </SchemaForm>
        </div>
    );
}
