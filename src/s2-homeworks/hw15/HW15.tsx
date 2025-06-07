import {CircularProgress} from "@mui/material";
import React, {useEffect, useState} from 'react';
import s2 from '../../s1-main/App.module.css';
import s from './HW15.module.css';
import axios from 'axios';
import SuperPagination from './common/c9-SuperPagination/SuperPagination';
import {useSearchParams} from 'react-router-dom';
import SuperSort from './common/c10-SuperSort/SuperSort';

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort
*
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message);
        });
};

const HW15 = () => {
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(4);
    const [isLoading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(100);
    const [searchParams, setSearchParams] = useSearchParams();
    const [techs, setTechs] = useState<TechType[]>([]);

    const sendQuery = (params: ParamsType) => {
        setLoading(true);
        getTechs(params)
            .then((res) => {
                // делает студент
                if (res) {
                    setTechs(res.data.techs);
                    setTotalCount(res.data.totalCount);
                    setLoading(false);
                }
                // сохранить пришедшие данные
                //
            });
    };

    const onChangePagination = (newPage: number, newCount: number) => {
        setPage(newPage);
        setCount(newCount);
        sendQuery({sort: sort, page: newPage, count: newCount});
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('page', newPage.toString());
            newParams.set('count', newCount.toString());
            return newParams;
        });
    };

    const onChangeSort = (newSort: string) => {
        setSort(newSort);
        setPage(page);
        sendQuery({sort: newSort, page, count});
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('sort', sort);
            newParams.set('page', page.toString());
            newParams.set('count', count.toString());
            return newParams;
        });
        // setSort(
        // setPage(1);
        // sendQuery(
        // setSearchParams(
        //
    };

    useEffect(() => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('sort', sort.toString());
            newParams.set('page', page.toString());
            newParams.set('count', count.toString());
            return newParams;
        });
        const params = Object.fromEntries(searchParams);
        sendQuery({sort: params.sort, page: +params.page, count: +params.count});
        setPage(+params.page || 1);
        setCount(+params.count || 4);
    }, []);

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ));

    return (
        <div id={'hw15'}>
            <hr className={`${s2.hr} ${s.hr_top}`}/>
            <div className={`${s2.hwTitle} ${s.title}`}>Homework #15</div>
            <hr className={`${s2.hr} ${s.hr_bottom}`}/>

            <div className={s.main}>
                {isLoading && <CircularProgress size={"5rem"} className={s.circular}/>}
                <div className={s.content}
                     style={isLoading ? {"opacity": "0.1"} : {"opacity": "1"}}
                >
                    <SuperPagination
                        page={page}
                        itemsCountForPage={count}
                        totalCount={totalCount}
                        onChange={onChangePagination}
                    />

                    <div className={s.rowHeader}>
                        <div className={s.techHeader}>
                            <strong>Tech</strong>
                            <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                        </div>

                        <div className={s.developerHeader}>
                            <strong>Developer</strong>
                            <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                        </div>
                    </div>

                    {mappedTechs}
                </div>
            </div>
        </div>
    );
};

export default HW15;
