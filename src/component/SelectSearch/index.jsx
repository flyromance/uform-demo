import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

export default class SelectSearch extends React.Component {
    state = {
        fetching: false,
        data: [],
        value: [],
    };

    lastFetchId = 0;

    handleFetch = debounce(() => {
        const url = this.props.url || 'https://randomuser.me/api/?results=5';
        const fetchId = ++this.lastFetchId;
        this.setState({ fetching: true, data: [] });
        fetch(url)
            .then(response => response.json())
            .then(body => {
                if (fetchId !== this.lastFetchId) {
                    // for fetch callback order
                    return;
                }
                const data = body.results.map(user => ({
                    label: `${user.name.first} ${user.name.last}`,
                    value: user.login.username,
                }));
                this.setState({ data, fetching: false });
            });
    }, 800);

    handleChange = value => {
        this.setState({
            value,
            data: [],
            fetching: false,
        });
        this.props.onChange && this.props.onChange(value);
    };

    render() {
        const { data, value, fetching } = this.state;
        return (
            <Select
                mode='multiple'
                labelInValue
                value={value}
                placeholder='Select users'
                notFoundContent={fetching ? <Spin size='small' /> : null}
                filterOption={false}
                onSearch={this.handleFetch}
                onChange={this.handleChange}
                style={{ width: '100%' }}
            >
                {data.map((item, idx) => {
                    return (
                        <Select.Option key={item.value} value={item.value}>
                            {item.label}
                        </Select.Option>
                    );
                })}
            </Select>
        );
    }
}
