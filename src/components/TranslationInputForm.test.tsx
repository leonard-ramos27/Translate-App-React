import { fireEvent, screen } from "@testing-library/react"
import { expect, test, describe } from "vitest"
import TranslationInputForm from "./TranslationInputForm"
import { renderWithProviders } from "@/test/test-utils"

const languages = [
  { code: "en", name: "English"}, 
  { code: "fr", name: "French"}, 
  { code: "es", name: "Spanish"},
  { code: "it", name: "Italian"},
  { code: "de", name: "German"},
]

describe("TranslationInputForm", () => {
    test("renders translate button", () => {
        renderWithProviders(<TranslationInputForm languages={languages} />)
        expect(screen.getByRole("button", {name: /Translate/i})).toBeInTheDocument()
    })

    test("should have 'Hello, how are you?' as the default text", () => {
        renderWithProviders(<TranslationInputForm languages={languages}/>)
        expect(screen.getByTestId("original-text")).toHaveValue("Hello, how are you?")
    })

    test("should have English as the selected source language by default", () => {
        renderWithProviders(<TranslationInputForm languages={languages}/>)
        expect(screen.getByRole("radio", {name: /english/i})).toBeChecked()
    })

    test("shows warning message when text exceeds 500 characters", () => {
        const longText = "a".repeat(501) // text with 501 characters
        renderWithProviders(<TranslationInputForm languages={languages}/>, {
            preloadedState: {
                translateParams: {
                    originalText: longText,
                    sourceLang: "en",
                    targetLang: "fr"
                }
            }
        })

        expect(screen.getByText(/Text can only be up to 500 characters./i)).toBeInTheDocument()
    })

    test("does not show warning message when text does not exceed 500 characters", () => {
        renderWithProviders(<TranslationInputForm languages={languages}/>, {
            preloadedState: {
                translateParams: {
                    originalText: "Hello!",
                    sourceLang: "en",
                    targetLang: "fr"
                }
            }
        })

        expect(screen.queryByText(/Text can only be up to 500 characters./i)).not.toBeInTheDocument()
    })

    test("updates Redux source language when a language button is clicked", () => {
        const { store } = renderWithProviders(<TranslationInputForm languages={languages}/>)
        // Find the French language button
        const frenchButton = screen.getByRole("radio", {name: /french/i})
        // Simulate clicking of the button
        fireEvent.click(frenchButton)
        // French button should now be checked
        expect(frenchButton).toBeChecked()
        // Redux store should also update
        expect(store.getState().translateParams.sourceLang).toBe("fr")
    })

    test("updates Redux original text when textarea value changes", () => {
        const { store } = renderWithProviders(<TranslationInputForm languages={languages}/>)
        // Find textarea using data-testid
        const textarea = screen.getByTestId("original-text")
        // Initially, it should have default value of Hello, how are you?
        expect(textarea).toHaveValue("Hello, how are you?")
        // Simulate user typing
        fireEvent.change(textarea, { target: { value: "New text input" } })
        // The textarea value should update
        expect(textarea).toHaveValue("New text input")
        // Redux store should also update
        expect(store.getState().translateParams.originalText).toBe("New text input")
    })
})