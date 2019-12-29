import React from 'react';
import UploadListAntd from 'antd/lib/upload/UploadList';
import { ConfigConsumerProps } from 'antd/lib/config-provider';
import { Icon, Progress, Tooltip } from 'antd';
import { isImageUrl } from 'antd/lib/upload/utils';
import classNames from 'classnames';
import Animate from 'rc-animate';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default class UploadList extends UploadListAntd {

    handleSort = (result) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            // @ts-ignore
            this.props.items,
            result.source.index,
            result.destination.index,
        );
        this.props.onSort(items);
    }


    renderUploadList = ({ getPrefixCls }) => {
        const {
            prefixCls: customizePrefixCls,
            items = [],
            listType,
            showPreviewIcon,
            showRemoveIcon,
            locale,
        } = this.props;
        const prefixCls = getPrefixCls('upload', customizePrefixCls);
        const list = items.map((file, indexOfFile) => {
            let progress;
            let icon = <Icon type={file.status === 'uploading' ? 'loading' : 'paper-clip'} />;

            if (listType === 'picture' || listType === 'picture-card') {
                if (listType === 'picture-card' && file.status === 'uploading') {
                    icon = <div className={`${prefixCls}-list-item-uploading-text`}>{locale.uploading}</div>;
                } else if (!file.thumbUrl && !file.url) {
                    icon = (
                        <Icon className={`${prefixCls}-list-item-thumbnail`} type="picture" theme="twoTone" />
                    );
                } else {
                    const thumbnail = isImageUrl(file) ? (
                        <img src={file.thumbUrl || file.url} alt={file.name} />
                    ) : (
                            <Icon type="file" className={`${prefixCls}-list-item-icon`} theme="twoTone" />
                        );
                    icon = (
                        <a
                            className={`${prefixCls}-list-item-thumbnail`}
                            onClick={e => this.handlePreview(file, e)}
                            href={file.url || file.thumbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {thumbnail}
                        </a>
                    );
                }
            }

            if (file.status === 'uploading') {
                // show loading icon if upload progress listener is disabled
                const loadingProgress =
                    'percent' in file ? (
                        <Progress type="line" {...this.props.progressAttr} percent={file.percent} />
                    ) : null;

                progress = (
                    <div className={`${prefixCls}-list-item-progress`} key="progress">
                        {loadingProgress}
                    </div>
                );
            }
            const infoUploadingClass = classNames({
                [`${prefixCls}-list-item`]: true,
                [`${prefixCls}-list-item-${file.status}`]: true,
            });
            const linkProps =
                typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
            const preview = file.url ? (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${prefixCls}-list-item-name`}
                    title={file.name}
                    {...linkProps}
                    href={file.url}
                    onClick={e => this.handlePreview(file, e)}
                >
                    {file.name}
                </a>
            ) : (
                    <span
                        className={`${prefixCls}-list-item-name`}
                        onClick={e => this.handlePreview(file, e)}
                        title={file.name}
                    >
                        {file.name}
                    </span>
                );
            const style = {
                pointerEvents: 'none',
                opacity: 0.5,
            };
            const previewIcon = showPreviewIcon ? (
                <a
                    href={file.url || file.thumbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={file.url || file.thumbUrl ? undefined : style}
                    onClick={e => this.handlePreview(file, e)}
                    title={locale.previewFile}
                >
                    <Icon type="eye-o" />
                </a>
            ) : null;
            const removeIcon = showRemoveIcon ? (
                <Icon type="delete" title={locale.removeFile} onClick={() => this.handleClose(file)} />
            ) : null;
            const removeIconClose = showRemoveIcon ? (
                <Icon type="close" title={locale.removeFile} onClick={() => this.handleClose(file)} />
            ) : null;
            const actions =
                listType === 'picture-card' && file.status !== 'uploading' ? (
                    <span className={`${prefixCls}-list-item-actions`}>
                        {previewIcon}
                        {removeIcon}
                    </span>
                ) : (
                        removeIconClose
                    );
            let message;
            if (file.response && typeof file.response === 'string') {
                message = file.response;
            } else {
                message = (file.error && file.error.statusText) || locale.uploadError;
            }
            const iconAndPreview =
                file.status === 'error' ? (
                    <Tooltip title={message}>
                        {icon}
                        {preview}
                    </Tooltip>
                ) : (
                        <span>
                            {icon}
                            {preview}
                        </span>
                    );

            return (
                <Draggable key={file.uid} draggableId={file.uid} index={indexOfFile}>
                    {(draggableProvided) => (
                        <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            className={infoUploadingClass}
                        >
                            <div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
                            {actions}
                            <Animate transitionName="fade" component="">
                                {progress}
                            </Animate>
                        </div>
                    )}
                </Draggable>
            );
        });
        const listClassNames = classNames({
            [`${prefixCls}-list`]: true,
            [`${prefixCls}-list-${listType}`]: true,
        });
        const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
        return (
            <Animate
                transitionName={`${prefixCls}-${animationDirection}`}
                component="div"
                className={listClassNames}
            >
                <DragDropContext onDragEnd={this.handleSort}>
                    <Droppable droppableId="droppable">
                        {(droppableProvided) => (
                            <div
                                ref={droppableProvided.innerRef}
                            >
                                {list}
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Animate>
        );
    }
}
