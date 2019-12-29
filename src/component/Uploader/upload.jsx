import React from 'react';
import UploadAntd from 'antd/lib/upload/Upload';
import { UploadLocale } from 'antd/lib/upload/interface';
import UploadList from './UploadList';

// interface UploadProps {
//     fileList: any[];
//     notifySort?: any; // 是否通知父组件已经发生排序改变
// }

// @ts-ignore
export default class Upload extends UploadAntd {

    static getDerivedStateFromProps(nextProps, prevState) {

        if ('fileList' in nextProps) {
            return {
                fileList: nextProps.fileList || [],
            };
        }
        return null;
    }

    handleSort = (items) => {
        // @ts-ignore
        if (this.props.onSort) { this.props.onSort(items); }
    }
    
    renderUploadList = (locale) => {
        const { showUploadList, listType, onPreview, previewFile } = this.props;
        const { showRemoveIcon, showPreviewIcon } = showUploadList;
        return (
            // @ts-ignore
          <UploadList
            listType={listType}
            items={this.state.fileList}
            previewFile={previewFile}
            onPreview={onPreview}
            onRemove={this.handleRemove}
            showRemoveIcon={showRemoveIcon}
            showPreviewIcon={showPreviewIcon}
            locale={{ ...locale, ...this.props.locale }}
            onSort={this.handleSort}
          />
        );
    }
}
