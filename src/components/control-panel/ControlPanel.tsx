import {v4 as uuid} from "uuid";
import classes from './СontrolPanel.module.css'
import {Item} from "../app/App.types";
import {ControlPanelProps} from "./ControlePanel.types";
import {useState} from "react";


const ControlPanel: React.FC<ControlPanelProps> = (
    {
        setItems,
        setInputValue,
        inputValue,
        checkExtension,
    }) => {
    const [invalidUrl, setInvalidUrl] = useState<boolean>(false)

    const insertUrlHandler = () => {
        if (inputValue) {
            const extension = checkExtension(inputValue)
            if (extension !== 'other') {
                const id = uuid()
                const item: Item = {id, src: inputValue, extension, isPlay: false}
                setItems((prev) => [item, ...prev])
                setInputValue('')
            } else {
                setInvalidUrl(true)
            }

        }

    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        if (invalidUrl) {
            const extension = checkExtension(event.currentTarget.value)
            if (extension !== 'other') {
                setInvalidUrl(false)
            }
        }

    }

    return (
        <div className={classes.controlPanelWrapper}>
            <div className={classes.inputWrapper}>
                <input
                    className={classes.input}
                    placeholder="Source url to media"
                    type="text"
                    value={inputValue}
                    onChange={onChangeHandler}
                />
                {invalidUrl &&
                    <span className={classes.errorMessage}>invalid url</span>
                }
            </div>
            <button
                className={classes.button}
                onClick={insertUrlHandler}>
                <b>
                    paste url
                </b>
            </button>
        </div>
    );
};

export default ControlPanel;





