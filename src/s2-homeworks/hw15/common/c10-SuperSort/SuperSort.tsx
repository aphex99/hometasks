import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import s from './SuperSort.module.css';
import {IconButton} from "@mui/material";
import React from 'react';

// добавить в проект иконки и импортировать
const downIcon = '[\\/]';
const upIcon = '[/\\]';
const noneIcon = '[--]';

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
    return sort === '' ? down : sort === down ? up : sort === up ? '' : down; // исправить
};

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {

    const up = '0' + value;
    const down = '1' + value;

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up));
        console.log(pureChange(sort, down, up));
    };

    // const icon = sort === down
    //     ? downIcon
    //     : sort === up
    //         ? upIcon
    //         : noneIcon;

    let buttonClass = s.sortButtonDisabled;

    switch (true) {
        case sort === `0${value}`:
            buttonClass = s.sortButtonDown;
            break;
        case sort === `1${value}`:
            buttonClass = s.sortButtonUp;
            break;
    }

    console.log(sort);

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            <IconButton className={buttonClass}>
                {/*<ArrowUpwardIcon fontSize="small" sx={{color: "black"}}/>*/}
                <ArrowDownwardIcon fontSize="small" sx={{color: "black"}}/>
            </IconButton>
            {/*сделать иконку*/}
            {/*<img*/}
            {/*    id={id + '-icon-' + sort}*/}
            {/*    src={icon}*/}
            {/*/>*/}
        </span>
    );
};

export default SuperSort;
