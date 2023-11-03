import {InputState, Item, MediaType} from "../app/App.types";

export interface ControlPanelProps extends InputState {
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
    checkExtension: (url: string) => MediaType
}