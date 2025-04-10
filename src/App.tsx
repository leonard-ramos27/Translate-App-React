
import { useEffect, useState } from 'react'
import { detect } from 'tinyld'
import axios from 'axios'
import TranslationInputForm from './components/TranslationInputForm'
import TranslationOutputBox from './components/TranslationOutputBox'
import './App.css'
import Logo from './assets/logo.svg'

const baseURL = "https://api.mymemory.translated.net/get"
const languages = [
  { code: "en", name: "English"}, 
  { code: "fr", name: "French"}, 
  { code: "es", name: "Spanish"},
  { code: "it", name: "Italian"},
  { code: "de", name: "German"},
]

function App() {
  const [sourceText, setSourceText] = useState("Hello, how are you?")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("fr")
  const [debouncedQuery, setDebouncedQuery] = useState(sourceText)
  const [isTranslating, setIsTranslating] = useState(false)

  const handleTranslate = async () => {
    try {
      let API_URL = ""
      setIsTranslating(true)
      if(sourceLang == "auto") {
        const detectedLang = detect(sourceText)
        if(detectedLang === targetLang){
          setTimeout(() => {
            setTranslatedText(sourceText)
            setIsTranslating(false)
          }, 500)
        } else {
          API_URL = `${baseURL}?q=${sourceText}&langpair=${detectedLang}|${targetLang}`
        }
      } else if(sourceLang === targetLang) {
        setTimeout(() => {
          setTranslatedText(sourceText)
          setIsTranslating(false)
        }, 500)
      } else {
        API_URL = `${baseURL}?q=${sourceText}&langpair=${sourceLang}|${targetLang}`
      }

      if(API_URL) {
        setTimeout(async () => {
          const response = await axios.get(API_URL)
          response.data.responseData.match && setTranslatedText(response.data.responseData.translatedText)
          setIsTranslating(false)
        }, 500)
      }
    } catch (error) {
      console.log("Error with handling translate: ", error)
      setTimeout(() => {
        setTranslatedText("")
        setIsTranslating(false)
      }, 500)
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(sourceText)
    }, 500)

    return () => clearTimeout(handler)
  }, [sourceText])

  useEffect(() => {
    if(!debouncedQuery) { 
      setTranslatedText("")
      return;
    }

    handleTranslate()
  }, [debouncedQuery])

  return (
    <main className='mx-3 lg:mx-[4.5rem] my-10 lg:my-[5.7rem] text-lightGray'>
      <div className='flex justify-center mb-[3.3rem]'>
        <img src={Logo} alt="" />
      </div>
      <div className='flex flex-col xl:flex-row xl:justify-between gap-4 lg:gap-[0.8rem] xl:gap-[0.8rem]'>
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
          handleSwitchLang={handleSwitchLang}
          isTranslating={isTranslating}/>
      </div>
    </main>
  )
}

export default App
