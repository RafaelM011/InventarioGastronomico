import React from "react";
import Select from 'react-select'

export const UnitDropdown = () => {
    const style = {
        indicatorsContainer: (base) => ({
            ...base,
            'background': '#1155cc',
            'border-radius': '0px 24px 50px 0px'           
        }),
        valueContainer: (base) => ({
            ...base,
            'background': '#1155cc',
            'border-radius': '50px 0px 0px 24px'
        }),
        control: (base) => ({
            ...base,
            'background': '#1155cc',
            'border-color': '#1155cc',
            'border-radius': '50px 24px 50px 24px',
            'height': '60px',
        }),
        option: (base, state) => ({
            ...base,
            'background': '#fff',
            'background-image': state.isFocused ? "linear-gradient(to right,#0067D1,#0067D1)" : '#fff',
            'color': state.isFocused ? "#fff" : "#000",
        }),
        menuList: (base) => ({
            ...base, 
            'border': '3px',
            'border-style': 'solid',
            'border-color': '#0067D1',
            'background': '#fff',
            "::-webkit-scrollbar": {
                'display': 'none'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
        }),
        singleValue: (base) => ({
            ...base,
            'color': 'white',
            'font-weight': '500',
            'padding': '0px 0px 0px 10px',
            'font-size': '24px'
        }),
        input: (base) => ({
            ...base,
            'padding': '0px 0px 0px 10px',
        }),
        placeholder: (base) => ({
            ...base,
            'font-weight': '500',
            'font-size': '24px'
        })
    }

    const options = [
        {label: 'Lb', value: 'Lb'},
        {label: 'Oz', value: 'Oz'},
        {label: 'Und', value: 'Und'},
        {label: 'Kl', value: 'Kl'},
        {label: 'Lt', value: 'Lt'},
        {label: 'Ml', value: 'Ml'},
        {label: 'Gr', value: 'Gr'},
        {label: 'Gl (128Onz)', value: 'Gl (128Onz)'}
    ]

    return(
        <>
            <Select styles={style} options={options}/>
        </>
    )
}