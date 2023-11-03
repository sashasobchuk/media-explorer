import {DragEndDrop, Item} from "../app/App.types";

export interface ControlPanelProps extends DragEndDrop {
    index: number
    item: Item
    handleStopOtherItemsPlay: (item: Item) => void
}
