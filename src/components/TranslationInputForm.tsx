import { useEffect, useRef, useState } from 'react'
import LanguageButton from './LanguageButton'
import LanguageDropdown from './LanguagesDropdown'

interface translationInputFormProps {
  languages: { code: string, name: string}[],
  sourceLang : string,
  defaultText: string,
  handleUpdateSourceText: (text: string) => void,
  handleChangeSourceLang: (lang: string) => void,
  handleTranslate: () => void,
}
  
export default function TranslationInputForm({
  languages, 
  sourceLang, 
  defaultText, 
  handleUpdateSourceText,
  handleChangeSourceLang, 
  handleTranslate
}: translationInputFormProps) {

  const textRef = useRef<HTMLTextAreaElement>(null)
  const [textLength, setTextLength] = useState(defaultText.length)

  useEffect(()=>{
      if(textRef.current) textRef.current.value = defaultText
  }, [defaultText])
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const textToTranslate = textRef.current?.value.trim()
      !textToTranslate ? console.log("Text cannot be empty") 
      : textToTranslate.length > 500 ? console.log("Text cannot be more than 500 characters")
      : handleTranslate()
  }
  
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleUpdateSourceText(e.target.value)
      setTextLength(e.target.value.length)
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <LanguageButton 
          id="btn-original-lang-auto"
          code="auto"
          checked={sourceLang == "auto"}
          text="Detect Language"
          onChange={handleChangeSourceLang}/>
        {languages.slice(0, 2).map((lang) => (
          <LanguageButton 
            id={`btn-original-lang-${lang.code}`}
            code={lang.code}
            checked={sourceLang == lang.code}
            text={lang.name}
            onChange={handleChangeSourceLang}
            key={lang.code}/>
        ))}
        {languages.length > 2 && (
          <LanguageDropdown 
            id='source-language'
            value={sourceLang}
            onChange={handleChangeSourceLang}
            languages={languages.slice(2)}/>
        )}
      </div>
      <textarea 
        name="original-text" 
        id="original-text"
        defaultValue={defaultText}
        ref={textRef}
        onChange={handleChangeText}></textarea>
      <div>{textLength}/500</div>
      {textLength > 500 && (
        <p>Text can only be up to 500 characters</p>
      )}
      <button type='submit'>Translate</button>
    </form>
  )
}