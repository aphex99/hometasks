import React, {ChangeEvent} from 'react';
import SuperSelect from '../../../hw07/common/c5-SuperSelect/SuperSelect';
import {Pagination} from '@mui/material';
import s from './SuperPagination.module.css';

export type SuperPaginationPropsType = {
    id?: string
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
    {
        page, itemsCountForPage, totalCount, onChange, id = 'hw15',
    }
) => {
    // пишет студент // вычислить количество страниц
    const lastPage = Math.ceil(totalCount / itemsCountForPage);

    const onChangeCallback = (event: ChangeEvent<unknown>, value: number) => {
        // пишет студент
        onChange(value, itemsCountForPage);
    };

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(page, +event.target.value);
    };
    const onChangeSelectOption = (value: number) => {
        onChange(page, value);
    };

    return (
        <div className={s.pagination}>
            <Pagination
                id={id + '-pagination'}
                sx={{
                    '& .MuiPaginationItem-root': {
                        fontSize: '14px',
                        height: 24,
                    }
                    // стили для Pagination // пишет студент
                }}
                page={page}
                count={lastPage}
                onChange={onChangeCallback}
                hideNextButton
                hidePrevButton
            />

            <span className={s.text1}>
                Показать
            </span>

            <SuperSelect
                id={id + '-pagination-select'}
                value={itemsCountForPage}
                options={[
                    {id: 4, value: 4},
                    {id: 7, value: 7},
                    {id: 10, value: 10},
                ]}
                onChange={onChangeSelect}
                onChangeOption={onChangeSelectOption}
            />

            <span className={s.text2}>

            </span>
        </div>
    );
};

export default SuperPagination;
