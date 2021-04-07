import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

// highlight-start
// Define a type for the slice state

type Tab = {
    name: string;
    link: string;
}

interface TabState {
    value: Array<any>
}

type TabPayload = {
    name: string;
    link: string;
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
            state.value = [action.payload]
        }
    }
})

export const { replaceTab } = tabSlice.actions

export default tabSlice.reducer