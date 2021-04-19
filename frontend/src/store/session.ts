import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { SessionModel } from '../models/Session';
interface SessionState {
    value: SessionModel | null;
}

const initialState: SessionState = {
    value: null
}


export const sessionSlice = createSlice({
    name: 'session',

    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<SessionModel>) => {
            state.value = action.payload
        }
    }
})

export const { setSession } = sessionSlice.actions

export const selectCount = (state: RootState) => state.session.value

export default sessionSlice.reducer