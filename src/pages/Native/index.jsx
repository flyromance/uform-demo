import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field, createFormActions } from '@uform/react';

const actions = createFormActions();
const InputField = props => (
    <Field {...props}>
        {({ state, mutators }) => {
            const loading = state.props.loading;
            return (
                <React.Fragment>
                    {props.label && <label>{props.label}</label>}
                    {loading ? (
                        'loading...'
                    ) : (
                        <input
                            disabled={!state.editable}
                            value={state.value || ''}
                            onchange={mutators.change}
                            onBlur={mutators.blur}
                            onFocus={mutators.focus}
                        />
                    )}
                    <span style={{ color: 'red' }}>{state.errors}</span>
                    <span style={{ color: 'orange' }}>{state.warnings}</span>
                </React.Fragment>
            );
        }}
    </Field>
);

export default function NativeApp() {
    return (
        <Form actions={actions}>
            <Field
                name='userList'
                initialValue={[{ username: 'fan', age: 21 }]}
            >
                {({ state, mutators }) => {
                    return (
                        <React.Fragment>
                            {state.value.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Field
                                            name={`userList[${index}]`}
                                            initialValue={{}}
                                        >
                                            {({
                                                state: innerState,
                                                mutators: innerMutators,
                                            }) => {
                                                return (
                                                    <React.Fragment>
                                                        {
                                                            Object.keys(innerState.value).map((key, idx) => {
                                                                if (!innerMutators.exist(key)) {
                                                                    return;
                                                                }
                                                                return (
                                                                    <React.Fragment>
                                                                        <InputField name={`userList[${index}].${key}`} />
                                                                        <button
                                                                            onClick={() => {
                                                                                innerMutators.remove(key);
                                                                            }}
                                                                        >
                                                                            x
                                                                        </button>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                        }
                                                        <button
                                                            onClick={() => { innerMutators.change({
                                                                ...innerState.value,
                                                                [new Date().getTime()]: new Date().getTime(),
                                                            }) }}
                                                        >
                                                            +
                                                        </button>
                                                    </React.Fragment>
                                                );
                                            }}
                                        </Field>
                                    </div>
                                );
                            })}
                            <button
                                onClick={() => {
                                    mutators.push({ username: 'cc', age: 21 });
                                }}
                            >
                                add item
                            </button>
                            <button
                                onClick={() => {
                                    console.log(
                                        actions.getFormState(
                                            state => state.values
                                        )
                                    );
                                }}
                            >
                                print
                            </button>
                        </React.Fragment>
                    );
                }}
            </Field>
        </Form>
    );
};
