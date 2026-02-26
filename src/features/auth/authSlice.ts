import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// PDF Phase 1: Store adminRole and adminId [cite: 17, 48]
interface AuthState {
    user: {
        adminId: string;
        email: string;
        adminRole: string;
    } | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: AuthState['user']; accessToken: string }>
        ) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
        },
        logOut: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
        },
    },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer