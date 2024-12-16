import { createAppSlice } from '@/redux/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
    isAuthenticated: boolean,
    user: UserInfo | null
}

const initialState: AccountState = {
    isAuthenticated: false,
    user: null
}

export const accountSlice = createAppSlice({
    name: "account",
    initialState,
    reducers: create => ({
        // Use the `PayloadAction` type to declare the contents of `action.payload`
        handleLogin: create.reducer(
            (state, action: PayloadAction<AccountState>) => {
                state.isAuthenticated = action.payload.isAuthenticated
                state.user = action.payload.user
            },
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectUser: account => account.user,
        selectIsAuthenticated: account => account.isAuthenticated,
    },
})

export const { handleLogin } = accountSlice.actions
// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIsAuthenticated, selectUser } = accountSlice.selectors
