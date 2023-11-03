import React, {useCallback, useState} from 'react';
import ControlPanel from "../control-panel/ControlPanel";
import classes from "./App.module.css";
import MediaItem from "../media-item/MediaItem";
import {Item, MediaType} from "./App.types";
import {IMAGE_EXTENSIONS, VIDEO_EXTENSIONS} from "./App.consts";


function App() {
    const [items, setItems] = useState<Item[]>(() => [])
    const [inputValue, setInputValue] = useState<string>(() => '')

    const dragItem = React.useRef<number | null>(null);
    const dragOverItem = React.useRef<number | null>(null);

    const checkExtension = useCallback((url: string): MediaType => {
        const fileExtension = url.substr(url.lastIndexOf('.'));
        if (IMAGE_EXTENSIONS.includes(fileExtension)) {
            return "img";
        } else if (VIDEO_EXTENSIONS.includes(fileExtension)) {
            return "video";
        } else {
            return "other"; // It's neither an image nor a video
        }
    }, [])

    const dragStart = useCallback((e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragItem.current = position;
    }, [items])

    const dragEnter = useCallback((e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragOverItem.current = position;
    }, [items]);

    const drop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        if (dragItem.current === null || dragOverItem.current === null) {
            console.error('current is null')
            alert('current is null')
            return
        }

        const copyListItems = [...items];

        const dragItemEl = items[dragItem.current]
        const dragOnItemEl = items[dragOverItem.current]

        copyListItems.splice(dragItem.current, 1, dragOnItemEl)
        copyListItems.splice(dragOverItem.current, 1, dragItemEl)

        dragItem.current = null;
        dragOverItem.current = null;

        setItems(copyListItems);
    }, [items]);

    const handlePlay = useCallback((item: Item) => {
        const newItems: Item[] = items.map((mapItem) => {
            return (
                item.id === mapItem.id
                    ? item
                    : {...mapItem, isPlay: false})
        })
        setItems(newItems)
    }, [items])

    return (
        <div className={classes.appWrapper}>
            <div className={classes.todoWrapper}>
                <div className={classes.todo}>
                    <ControlPanel
                        setInputValue={setInputValue}
                        setItems={setItems}
                        inputValue={inputValue}
                        checkExtension={checkExtension}
                    />
                    {items.map((item, index) => {
                        return (
                            <MediaItem
                                key={item.id}
                                index={index}
                                item={item}
                                dragStart={dragStart}
                                dragEnter={dragEnter}
                                drop={drop}
                                handleStopOtherItemsPlay={handlePlay}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
