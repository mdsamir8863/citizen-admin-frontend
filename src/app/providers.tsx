import React from 'react'

// This file is for any providers that you want to use in your app, such as Redux Provider, ThemeProvider, etc.
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}