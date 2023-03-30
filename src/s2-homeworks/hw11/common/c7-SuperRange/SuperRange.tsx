import React from 'react'
import {Slider, SliderProps} from '@mui/material'

type SliderPropsType = SliderProps & {
    onChange: (e: Event, value: number | number[], activeThumb: number) => void
}

const SuperRange: React.FC<SliderPropsType> = (props) => {

    return (
        <Slider
            sx={{ // стили для слайдера // пишет студент
                margin: "0 30px",
                boxSizing: 'border-box',
                width: '147px',
                borderRadius: '10px',
                '& .MuiSlider-rail': {
                    color: '#8B8B8B',
                },
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange