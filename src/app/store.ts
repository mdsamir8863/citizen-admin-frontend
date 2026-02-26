import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // Note: Future mein jab backend aayega, hum yahan RTK Query ka apiSlice add karenge
        // [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: import.meta.env.MODE !== 'production',
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

// Types for TypeScript support
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch