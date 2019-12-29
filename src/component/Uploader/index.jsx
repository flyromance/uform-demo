import React, { useState, useCallback, useMemo, useEffect } from 'React';
import { Modal, Icon, message } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import UploadMe from './upload';
import getUid from './uid';

// size 大小
// accept 类型
// scale 比例
// 拖拽上传、点击上传

// 单张single  

// || 多张multiple 张数(超过不让点了disabled)
// maxCount
// 上传的文件可以拖拽排序、可以删除、可以预览


// value onChange
/*
interface {
    multiple: boolean
    size: number | string
    beforeUpload: func
    value: string[]
    onChange: func
}

interface ImageItem {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
}
*/

function toByte(s) {
    const match = /[a-zA-Z]+/.exec(s);
    let ret = parseInt(s);
    if (match) {
        switch(match[0].toLowerCase()) {
            case 'b':
                ret = parseInt(s);
                break;
            case 'kb':
            case 'k':
                ret = parseInt(s) * Math.pow(2, 10);
                break;
            case 'mb':
            case 'm':
                ret = parseInt(s) * Math.pow(2, 20);
                break;
            case 'g':
            case 'gb':
                ret = parseInt(s) * Math.pow(2, 30);
                break;
        }
    }
    return ret;
}

function toAntImage(list = []) {
    return list.map(item => {
        if (typeof item === 'string') {
            item = {
                url: item,
            }
        }
        if (!item.uid) {
            item.uid = getUid();
        }
        if (!item.status) {
            item.status = 'done';
        }

        if (!item.name) {
            item.name = 'picture';
        }
        return item;
    });
}

const UPLOAD_URL = 'https://ev.bytedance.net/ev/class/v1/upload/';

function formatFileList(fileList) {
    return fileList.slice().filter(item => {
        const { status, response, name } = item;
        if (status === 'done' && response) {
            const { err_no, data, } = response;
            item['url'] = `https://${data.domain}${data.path}${data.key}`;
            item.height && (item['height'] = +files_path.height);
            item.width && (item['width'] = +files_path.width);
        }
        return true;
    });
};

export default class UploadME extends React.Component {

    handleResort = (fileList) => {
        const { onChange } = this.props;
        onChange && onChange(fileList);
    }

    handleChange = (info) => {
        const { file, fileList } = info;
        const { onChange, value } = this.props;
        console.log('change', info);
        onChange && onChange(formatFileList(fileList));
    }

    checkBeforeUpload = (file) => {
        const { maxSize, scale } = this.props;

        if (maxSize && file.size > toByte(maxSize)) {
            message.warn(`图片太大，请重新上传~`);
            return false;
        }
    
        if (scale && scale.length) {
            if (scale[0] && file.width !== scale[0]) {
                message.warn(`图片尺寸不正确，请重新上传~`);
                return false;
            }
            if (scale[1] && file.height !== scale[1]) {
                message.warn(`图片尺寸不正确，请重新上传~`);
                return false;
            }
        }
    };

    render() {
        const {
            maxCount = false,
            minCount = 1,
            maxSize,
            scale = [],
            multiple = false,
            value = [],
            onChange,
            ...rest
        } = this.props;
    
        const imgList = toAntImage(Array.isArray(value) ? value : [value]);
    
        return (
            <UploadMe
                type='drag'
                fileList={imgList}
                multiple={true}
                beforeUpload={this.checkBeforeUpload}
                listType='picture'
                // action={'/ev/class/v1/upload/'}
                action={'/admin/api/upload/v1/file'}
                showUploadList={{showRemoveIcon: true}}
                onSort={this.handleResort}
                onChange={this.handleChange}
                // onPreview={(file) => {
                //     console.log('preview', file);
                //     Modal.info({
                //         content: <img
                //             src={file.url}
                //             width="100%"
                //             height="100%"
                //         />
                //     });
                // }}
                {...rest}
            >
                <div>
                    <div className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </div>
                    <div className="ant-upload-text">
                        <div>点击或拖拽上传图片</div>
                        {scale && scale.length >= 2 ? <div>图片尺寸{`${scale[0]}*${scale[1]}`}</div> : null}
                        {multiple ? `最少上传${minCount}张，最多可传${maxCount}张` : null }
                    </div>
                </div>
            </UploadMe>
        );
    }
}