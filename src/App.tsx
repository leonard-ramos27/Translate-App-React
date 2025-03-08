
import { useEffect, useState } from 'react'
import { detect } from 'tinyld'
import axios from 'axios'
import TranslationInputForm from './components/TranslationInputForm'
import TranslationOutputBox from './components/TranslationOutputBox'
import './App.css'

const baseURL = "https://api.mymemory.translated.net/get"
const languages = [{ code: "en", name: "English"}, { code: "fr", name: "French"}, { code: "es", name: "Spanish"}]

function App() {
  const [sourceText, setSourceText] = useState("Hello, how are you?")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("fr")

  const handleTranslate = async () => {
    try {
      let API_URL = ""

      if(sourceLang == "auto") {
        const detectedLang = detect(sourceText)
        if(detectedLang === targetLang){
          setTranslatedText(sourceText)
        } else {
          API_URL = `${baseURL}?q=${sourceText}&langpair=${detectedLang}|${targetLang}`
        }
      } else if(sourceLang === targetLang) {
        setTranslatedText(sourceText)
      } else {
        API_URL = `${baseURL}?q=${sourceText}&langpair=${sourceLang}|${targetLang}`
      }

      if(API_URL) {
        const response = await axios.get(API_URL)
        response.data.responseData.match && setTranslatedText(response.data.responseData.translatedText)
      }
    } catch (error) {
      console.log("Error with handling translate: ", error)
    }
  }

  const handleUpdateSourceText = (text: string) => setSourceText(text)

  const handleChangeSourceLang = (lang: string) => setSourceLang(lang)

  const handleChangeTargetLang = (lang: string) => setTargetLang(lang)

  const handleSwitchLang = () => {
    setSourceLang((prevSource) => {
      setTargetLang(prevSource === "auto" ? detect(sourceText) : prevSource)
      setSourceText(translatedText)
      return targetLang
    })
  }

  useEffect(() => {
    handleTranslate()
  }, [targetLang])

  return (
    <>
      <div>translated.io</div>
      <TranslationInputForm 
        languages={languages}
        sourceLang={sourceLang} 
        defaultText={sourceText} 
        handleUpdateSourceText={handleUpdateSourceText}
        handleChangeSourceLang={handleChangeSourceLang} 
        handleTranslate={handleTranslate}/>
      <TranslationOutputBox 
        languages={languages}
        targetLang={targetLang}
        handleChangeTargetLang={handleChangeTargetLang}
        translatedText={translatedText}
        handleSwitchLang={handleSwitchLang}/>
    </>
  )
}

export default App
