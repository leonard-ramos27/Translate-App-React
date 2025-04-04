import { useEffect, useRef, useState } from 'react'
import LanguageButton from './LanguageButton'
import LanguageDropdown from './LanguagesDropdown'
import SortAlfa from '../assets/Sort_alfa.svg'
import SoundMaxFill from '../assets/sound_max_fill.svg'
import Copy from '../assets/Copy.svg'

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
    <form 
      onSubmit={handleSubmit} 
      className=' border border-darkSlate rounded-3xl bg-darkOverlay p-[1.35rem] lg:p-[1.4rem] xl:flex-1'>
      <div className=' flex flex-row flex-wrap gap-[12px]'>
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
      <hr className=' my-[.8rem] text-darkSlate'/>
      <textarea 
        name="original-text" 
        id="original-text"
        defaultValue={defaultText}
        ref={textRef}
        className=' py-[.6rem] text-base font-bold w-full h-[9rem] resize-none'
        onChange={handleChangeText}></textarea>
      <div className=' text-end text-[.8rem]'>{textLength}/500</div>
      {textLength > 500 && (
        <p>Text can only be up to 500 characters</p>
      )}
      <div className=' flex justify-between items-center mt-[0.6rem]'>
        <div className=' self-end flex gap-2'>
          <button className=' border-2 border-slateGray p-[6px] rounded-xl'>
            <img src={SoundMaxFill} alt="" />
          </button>
          <button className=' border-2 border-slateGray p-[6px] rounded-xl'>
            <img src={Copy} alt="" />
          </button>
        </div>
        <button 
          type='submit'
          className=' font-bold bg-royalBlue border border-skyBlue flex justify-between gap-2 py-[.7rem] px-[1.5rem] lg:px-[1.45rem] rounded-xl lg:mt-[1px]'>
          <img src={SortAlfa} alt="" />
          <span>Translate</span>
        </button>
      </div>
    </form>
  )
}