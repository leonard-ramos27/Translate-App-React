import LanguageButton from "./LanguageButton";
import LanguageDropdown from "./LanguagesDropdown";
import HorizontalTopLeftMain from '../assets/Horizontal_top_left_main.svg';
import AudioCopyControls from "./AudioCopyControls";
import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'

interface translationOutputBoxProps {
    languages: { code: string, name: string}[],
    targetLang: string,
    handleChangeTargetLang: (lang: string) => void,
    handleSwitchLang: () => void,
    translatedText: string,
    isTranslating: boolean
}

export default function TranslationOutputBox({
    languages,
    targetLang, 
    handleChangeTargetLang, 
    handleSwitchLang, 
    translatedText,
    isTranslating
}: translationOutputBoxProps) {
    return (
      <div className="border border-darkSlate rounded-3xl bg-blackOverlay p-[1.4rem] xl:flex-1">
        <div className="flex flex-row flex-wrap gap-[12px]">
          {languages.slice(0, 2).map((lang) => (
            <LanguageButton  
              id={`btn-translated-lang-${lang.code}`}
              code={lang.code}
              checked={targetLang == lang.code}
              text={lang.name}
              onChange={handleChangeTargetLang}
              key={lang.code}/>
          ))}
          {languages.length > 2 && (
            <LanguageDropdown 
              id="translated-language"
              value={targetLang}
              onChange={handleChangeTargetLang}
              languages={languages.slice(2)}/>
          )}
          <button 
            onClick={handleSwitchLang}
            aria-label="Switch translating language and translated language"
            className="ms-auto border-2 border-slateGray p-[4px] rounded-xl lg:my-[2px] cursor-pointer hover:scale-105 active:scale-95 transition">
            <img src={HorizontalTopLeftMain} alt="" />
          </button>
        </div>
        <hr className='my-[.9rem] text-darkSlate'/>
        <div className="py-[.6rem] text-base font-bold w-full h-[12rem]">
          {translatedText}
          {isTranslating && 
            <span className=" ms-2 -translate-y-[8px]">
              <DotWave
                size="35"
                speed="1"
                color="var(--color-lightGray)" 
              />
            </span>
          }
        </div>
        <AudioCopyControls style='w-fit' getText={() => { return translatedText }} />
      </div>
    )
  }