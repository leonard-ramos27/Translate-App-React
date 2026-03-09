import React, { ReactNode } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"
import { AppStore, PreloadedState, setupStore } from "@/store/store"

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: PreloadedState
  store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
    ) {
    function Wrapper({ children }: { children?: ReactNode }) {
        return <Provider store={store}>{children}</Provider>
    }

    return { 
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }) 
    }
}