import React from 'react';
import {
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
    FormSpy,
    SchemaForm,
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
                    type='string'
                    title='string'
                    name='string'
                />
                {/* <FormSpy>
                    {({ state, form }) => {
                        return <div>name: {form.getFieldValue(string)}</div>;
                    }}
                </FormSpy> */}
                <Field
                    type='radio'
                    enum={[{ value: '1', label: 'xxx' }, '2', '3', '4']}
                    title='Radio'
                    name='radio'
                />
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
                </FormButtonGroup>
            </SchemaForm>
        </div>
    );
}
