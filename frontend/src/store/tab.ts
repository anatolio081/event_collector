import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { findIndex, propEq } from 'ramda'
import { RootState } from './index'

type Tab = {
    id: string | number;
    name: string;
    link: string;
    data?: any;
}

interface TabState {
    value: Array<Tab>
}

type TabPayload = {
    id: string | number;
    name: string;
    link: string;
    data?: any;
}


const initialState: TabState = {
    value: []
}


export const tabSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        replaceTab: (state, action: PayloadAction<TabPayload>) => {
            const tabData = action.payload;
            const index = findIndex(propEq('link', tabData.link))(state.value)
            if (index > -1) {
                state.value[index] = tabData;
            } else {
                state.value.push(tabData);
            }
        },
        removeTab: (state, action: PayloadAction<number | string>) => {
            const index = findIndex(propEq('id', action.payload))(state.value)
            if (index > -1) {
                state.value.splice(index, 1);
            }
        }
    }
})

export const { replaceTab, removeTab } = tabSlice.actions

export default tabSlice.reducer