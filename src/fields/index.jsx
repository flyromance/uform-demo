import React from 'react';
import { Cascader, Input } from 'antd';
import { registerFormField, connect } from '@uform/react-schema-renderer';

import Xme from '../component/Xme';
import SelectSearch from '../component/SelectSearch';
import ArrayMe from '../component/ArrayMe';
import UploadMe from '../component/Uploader';

registerFormField(
    'cascader',
    connect()(props => <Cascader {...props} value={props.value || ''} />)
);

registerFormField(
    'select_search',
    connect()(props => {
        return <SelectSearch {...props} />;
    })
);

registerFormField('array_me', ArrayMe);

registerFormField(
    'upload_me',
    connect({
        getProps: () => {}
    })(props => {
        return <UploadMe {...props} />;
    })
);