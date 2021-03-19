import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { SessionModel } from '../models/Session';

// highlight-start
// Define a type for the slice state
interface SessionState {
    value: SessionModel | null;
}

// Define the initial state using that type
const initialState: SessionState = {
    value: null
}
// highlight-end

export const sessionSlice = createSlice({
    name: 'session',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<SessionModel>) => {
            state.value = action.payload
        }
    }
})

export const { setSession } = sessionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.session.value

export default sessionSlice.reducer