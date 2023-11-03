import React from "react";

export type MediaType = 'img' | 'video' | 'other'

export interface Item {
    id: string
    src: string
    extension: MediaType
    isPlay: boolean
}

export interface DragEndDrop {
    dragStart(e: React.DragEvent<HTMLDivElement>, position: number): void
    dragEnter(e: React.DragEvent<HTMLDivElement>, position: number): void
    drop(e: React.DragEvent<HTMLDivElement>): void
}

export interface InputState {
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>
}

