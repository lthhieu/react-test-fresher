import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
    isAuthenticated: boolean,
    user: UserInfo | null
}

const initialState: AccountState = {
    isAuthenticated: false,
    user: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        handleLogin: (state, action: PayloadAction<AccountState>) => {
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user
        },
    },
})

export const { handleLogin } = accountSlice.actions

export default accountSlice.reducer