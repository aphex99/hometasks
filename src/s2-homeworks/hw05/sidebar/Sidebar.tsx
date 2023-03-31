import React, {FC} from 'react'
import {NavLink, matchPath, useLocation} from 'react-router-dom'
import s from './Sidebar.module.css'
import {PATH} from '../Pages'
import closeIcon from './closeOutline.svg'

type PropsType = {
    open: boolean
    handleClose: () => void
}

export const Sidebar: FC<PropsType> = ({open, handleClose}) => {

    const sidebarClass = s.sidebar
        + (open ? ' ' + s.open : '')

    const {pathname} = useLocation()
    const preJuniorPath = !!matchPath(pathname, '/pre-junior')
    const juniorPath = !!matchPath(pathname, '/junior')
    const juniorPlusPath = !!matchPath(pathname, '/junior-plus')

    const preJuniorPathActiveClass = preJuniorPath ? s.active : ''
    const juniorPathActiveClass = juniorPath ? s.active : ''
    const juniorPlusPathActiveClass = juniorPlusPath ? s.active : ''

    return (
        <>
            {/*затемнение справа от открытого меню*/}
            {open && <div className={s.background} onClick={handleClose}/>}

            <aside className={sidebarClass}>
                <button className={s.close} onClick={handleClose}>
                    <img
                        src={closeIcon}
                        alt="close sidebar"
                        id={'hw5-menu-close'}
                    />
                </button>

                <nav id={'hw5-menu'} className={s.nav}>
                    <span className={s.linkWrap}>
                        <NavLink
                            id={'hw5-pre-junior-link'}
                            to={PATH.PRE_JUNIOR}
                            onClick={handleClose}
                            className={preJuniorPathActiveClass}
                            // className={...} // делает студент
                        >
                        Pre-junior
                    </NavLink>
                    </span>

                    <span className={s.linkWrap}>
                        <NavLink
                            id={'hw5-junior-link'}
                            to={PATH.JUNIOR}
                            onClick={handleClose}
                            className={juniorPathActiveClass}
                            // className={...} // делает студент
                        >
                        Junior
                    </NavLink>
                    </span>

                    <span className={s.linkWrap}>
                        <NavLink
                            id={'hw5-junior-plus-link'}
                            to={PATH.JUNIOR_PLUS}
                            onClick={handleClose}
                            className={juniorPlusPathActiveClass}
                            // className={...} // делает студент
                        >
                        Junior Plus
                    </NavLink>
                    </span>
                </nav>
            </aside>
        </>
    )
}
