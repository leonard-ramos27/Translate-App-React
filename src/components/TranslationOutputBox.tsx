import LanguageButton from "./LanguageButton";
import LanguageDropdown from "./LanguagesDropdown";
import HorizontalTopLeftMain from '../assets/Horizontal_top_left_main.svg';
import AudioCopyControls from "./AudioCopyControls";
import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslateTextQuery } from "@/store/translateApi";
import { setSwitchLang, setTargetLang } from "@/store/translateParamsSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { useDetectLanguage } from "@/hooks/useDetectLanguage";

interface translationOutputBoxProps {
    languages: { code: string, name: string}[],
}

export default function TranslationOutputBox({
    languages,
}: translationOutputBoxProps) {
  const { originalText, sourceLang, targetLang } = useSelector((state: RootState) => state.translateParams)
  const debouncedText = useDebounce(originalText.slice(0, 500))
  const detectedLang = useDetectLanguage(debouncedText, sourceLang)
  const { data, isFetching } = useTranslateTextQuery({
    originalText: debouncedText,
    sourceLang: detectedLang,
    targetLang
  }, {
    skip: originalText.length > 500,
  })
  const dispatch = useDispatch()

    return (
      <div className="border border-darkSlate rounded-3xl bg-blackOverlay p-[1.4rem] xl:flex-1">
        <div className="flex flex-row flex-wrap gap-[12px]">
          {languages.slice(0, 2).map((lang) => (
            <LanguageButton  
              id={`btn-translated-lang-${lang.code}`}
              code={lang.code}
              checked={targetLang == lang.code}
              text={lang.name}
              onChange={() => dispatch(setTargetLang(lang.code))}
              key={lang.code}/>
          ))}
          {languages.length > 2 && (
            <LanguageDropdown 
              id="translated-language"
              value={targetLang}
              onChange={(lang) => dispatch(setTargetLang(lang))}
              languages={languages.slice(2)}/>
          )}
          <button 
            onClick={() => dispatch(setSwitchLang(data.responseData.translatedText ? data.responseData.translatedText : ""))}
            aria-label="Switch translating language and translated language"
            className="ms-auto border-2 border-slateGray p-[4px] rounded-xl lg:my-[2px] cursor-pointer hover:scale-105 active:scale-95 transition">
            <img src={HorizontalTopLeftMain} alt="" />
          </button>
        </div>
        <hr className='my-[.9rem] text-darkSlate'/>
        <div className="py-[.6rem] text-base font-bold w-full h-[12rem]">
          {isFetching ? (
            <span className=" ms-2 -translate-y-[8px]">
              <DotWave
                size="35"
                speed="1"
                color="var(--color-lightGray)" 
              />
            </span>
          ) : sourceLang === targetLang ? (
            originalText
          ) : data.responseData.match ? (
            data.responseData.translatedText
          ) : ''
          }
        </div>
        <AudioCopyControls style='w-fit' getText={() => { return data ? data.responseData.translatedText : "" }} />
      </div>
    )
  }