import { useRef, useState } from 'react'
import LanguageButton from './LanguageButton'
import LanguageDropdown from './LanguagesDropdown'
import SortAlfa from '../assets/Sort_alfa.svg'
import AudioCopyControls from './AudioCopyControls'
import { RootState } from "@/store/store";
import { setOriginalText, setSourceLang } from '@/store/translateParamsSlice'
import { useTranslateTextQuery } from '@/store/translateApi'
import { useDetectLanguage } from '@/hooks/useDetectLanguage'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

interface translationInputFormProps {
  languages: { code: string, name: string}[],
}
  
export default function TranslationInputForm({
  languages, 
}: translationInputFormProps) {
  const { originalText, sourceLang, targetLang } = useAppSelector((state: RootState) => state.translateParams)
  const dispatch = useAppDispatch()
  const detectedLang = useDetectLanguage(originalText,sourceLang)
  const { refetch } = useTranslateTextQuery({
    originalText,
    sourceLang: detectedLang,
    targetLang
  },{
    skip: originalText.length > 500,
  })
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [isTextOverLimit, setIsTextOverLimit] = useState(originalText.length > 500)
  
  
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    const value = textRef.current?.value
    if(value){
      dispatch(setOriginalText(value))
      if(value.length > 500){
        setIsTextOverLimit(true)
      } else {
        setIsTextOverLimit(false)
        refetch()
      }
    }
  }
  
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      dispatch(setOriginalText(value))
      if(value.length > 500){
        setIsTextOverLimit(true)
      } else {
        setIsTextOverLimit(false)
      }
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
          onChange={() => dispatch(setSourceLang("auto"))}/>
        {languages.slice(0, 2).map((lang) => (
          <LanguageButton 
            id={`btn-original-lang-${lang.code}`}
            code={lang.code}
            checked={sourceLang == lang.code}
            text={lang.name}
            onChange={() => dispatch(setSourceLang(lang.code))}
            key={lang.code}/>
        ))}
        {languages.length > 2 && (
          <LanguageDropdown 
            id='source-language'
            value={sourceLang}
            onChange={(lang) => dispatch(setSourceLang(lang))}
            languages={languages.slice(2)}/>
        )}
      </div>
      <hr className=' my-[.8rem] text-darkSlate'/>
      <textarea 
        name="original-text" 
        id="original-text"
        aria-label='Enter text to translate'
        value={originalText}
        ref={textRef}
        data-testid="original-text"
        className='py-[.6rem] text-base font-bold w-full h-[9rem] resize-none focus-visible:outline-none'
        onChange={handleChangeText}></textarea>
      <div className='flex justify-end items-center gap-4'>
        { isTextOverLimit && (
          <p className='flex-1'>Text can only be up to 500 characters.</p>
        )}
        <div className=' text-end text-[.8rem]'>{originalText.length}/500</div>
      </div>
      <div className='flex justify-between items-center mt-[0.6rem]'>
        <AudioCopyControls 
          style='self-end' 
          getText={() => { return textRef.current?.value.trim()} } />
        <button 
          type='submit'
          className='font-bold bg-royalBlue border border-skyBlue flex justify-between gap-2 py-[.7rem] px-[1.5rem] lg:px-[1.45rem] rounded-xl lg:mt-[1px] cursor-pointer active:bg-royalBlue/80 transition'>
          <img src={SortAlfa} alt="" />
          <span>Translate</span>
        </button>
      </div>
    </form>
  )
}