import { createAppSlice } from '@/redux/createAppSlice'
import { fetchAccount } from '@/redux/feature/account/accountAPI'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
    isAuthenticated: boolean,
    user: UserInfo | null,
    loading?: "idle" | "loading" | "failed"
}

const initialState: AccountState = {
    isAuthenticated: false,
    user: null,
    loading: "idle",
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

        handleFetchAccountAsync: create.asyncThunk(
            async () => {
                const response = await fetchAccount()
                // The value we return becomes the `fulfilled` action payload
                return response
            },
            {
                pending: state => {
                    state.loading = "loading"
                },
                fulfilled: (state, action) => {
                    state.loading = "idle"
                    state.user = action.payload.user
                    state.isAuthenticated = true
                },
                rejected: state => {
                    state.loading = "failed"
                },
            },
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectUser: account => account.user,
        selectIsAuthenticated: account => account.isAuthenticated,
        selectLoading: account => account.loading,
    },
})

export const { handleLogin, handleFetchAccountAsync } = accountSlice.actions
// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIsAuthenticated, selectUser, selectLoading } = accountSlice.selectors
