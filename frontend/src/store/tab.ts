import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { findIndex, propEq } from 'ramda'
import { RootState } from './index'

// highlight-start
// Define a type for the slice state

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

// Define the initial state using that type
const initialState: TabState = {
    value: []
}
// highlight-end

export const tabSlice = createSlice({
    name: 'session',
    // `createSlice` will infer the state type from the `initialState` argument
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