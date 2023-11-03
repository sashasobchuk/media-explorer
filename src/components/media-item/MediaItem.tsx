import React, {useEffect, useRef} from 'react';
import classes from './MediaItem.module.css'
import {ControlPanelProps} from "./MediaItem.types";

const MediaItem: React.FC<ControlPanelProps> = (
    {
        dragStart,
        dragEnter,
        drop,
        index,
        item,
        handleStopOtherItemsPlay
    }) => {

    const mediaElement = useRef<HTMLVideoElement>(null)

    const onPlayVideoHandler = (event?: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        handleStopOtherItemsPlay(item)
    }
    const onPauseVideoHandler = () => {
        item.isPlay = false
    }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dragStart(e, index)
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dragEnter(e, index)
    }

    useEffect(() => {

        if (mediaElement.current) {
            mediaElement.current.pause()
        }
    }, [item])

    return (
        <div
            key={item.id}
            className={classes.mediaItemWrapper}
            draggable={true}
            onDragStart={dragStartHandler}
            onDragEnter={dragEndHandler}
            onDragEnd={drop}
        >
            {item.extension === 'video'
                ? <video
                    onPause={onPauseVideoHandler}
                    ref={mediaElement}
                    onPlay={onPlayVideoHandler}
                    className={classes.mediaItem}
                    controls={true}
                    src={item.src}

                />
                : <img  className={classes.mediaItem} src={item.src} alt={'media image'}/>
            }
        </div>
    );
};

export default MediaItem;