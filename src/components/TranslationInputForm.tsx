import { useEffect, useRef, useState } from 'react'

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
        <label htmlFor="btn-original-lang-auto">
          <input 
            type="radio"
            id='btn-original-lang-auto'
            name='original-language'
            value="auto"
            checked={sourceLang == "auto"}
            onChange={(e) => handleChangeSourceLang(e.target.value)} />
          <span>Detect Language</span>
        </label>
        {languages.map((lang) => (
          <label htmlFor={`btn-original-lang-${lang.code}`} key={lang.code}>
            <input 
              type="radio"
              id={`btn-original-lang-${lang.code}`}
              name='original-language'
              value={lang.code}
              checked={sourceLang == lang.code}
              onChange={(e) => handleChangeSourceLang(e.target.value)} />
            <span>{lang.name}</span>
          </label>
        ))}
      </div>
      <textarea 
        name="original-text" 
        id="original-text"
        defaultValue={defaultText}
        ref={textRef}
        onChange={handleChangeText}></textarea>
      <div>{textLength}/500</div>
      <button type='submit'>Translate</button>
    </form>
  )
}