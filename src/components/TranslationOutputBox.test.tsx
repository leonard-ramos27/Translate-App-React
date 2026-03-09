import { renderWithProviders } from "@/test/test-utils"
import { describe, expect, test } from "vitest"
import TranslationOutputBox from "./TranslationOutputBox"
import { fireEvent, screen } from "@testing-library/react"

const languages = [
  { code: "en", name: "English"}, 
  { code: "fr", name: "French"}, 
  { code: "es", name: "Spanish"},
  { code: "it", name: "Italian"},
  { code: "de", name: "German"},
]

describe("TranslationOutputBox", () => {
    test("should have French as the selected target language by default", () => {
        renderWithProviders(<TranslationOutputBox languages={languages}/>)
        expect(screen.getByRole("radio", {name: /french/i})).toBeChecked()
    })

    test("updates Redux target language when a language button is clicked", () => {
        const { store } = renderWithProviders(<TranslationOutputBox languages={languages}/>)
        // Find the French language button
        const englishButton = screen.getByRole("radio", {name: /english/i})
        // Simulate clicking of the button
        fireEvent.click(englishButton)
        // French button should now be checked
        expect(englishButton).toBeChecked()
        // Redux store should also update
        expect(store.getState().translateParams.targetLang).toBe("en")
    })

    test("renders a switch language button", () => {
        renderWithProviders(<TranslationOutputBox languages={languages} />)
        expect(screen.getByRole("button", {name: /Switch Languages/i})).toBeInTheDocument()
    })

    test("should switch target and source language when switch language button is clicked", () => {
        const { store } = renderWithProviders(<TranslationOutputBox languages={languages} />)
        // Simulate clicking of the switch language button
        fireEvent.click(screen.getByRole("button", {name: /Switch Languages/i}))
        // French button should now be unchecked
        expect(screen.getByRole("radio", {name: /french/i})).not.toBeChecked()
        // English button should now be checked
        expect(screen.getByRole("radio", {name: /english/i})).toBeChecked()
        // Redux store should also update
        expect(store.getState().translateParams.sourceLang).toBe("fr")
        expect(store.getState().translateParams.targetLang).toBe("en")
    })
})