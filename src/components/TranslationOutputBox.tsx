import LanguageButton from "./LanguageButton";
import LanguageDropdown from "./LanguagesDropdown";
import HorizontalTopLeftMain from '../assets/Horizontal_top_left_main.svg';
import SoundMaxFill from '../assets/sound_max_fill.svg';
import Copy from '../assets/Copy.svg';

interface translationOutputBoxProps {
    languages: { code: string, name: string}[],
    targetLang: string,
    handleChangeTargetLang: (lang: string) => void,
    handleSwitchLang: () => void,
    translatedText: string,
}

export default function TranslationOutputBox({
    languages,
    targetLang, 
    handleChangeTargetLang, 
    handleSwitchLang, 
    translatedText
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
            className="ms-auto border-2 border-slateGray p-[4px] rounded-xl lg:my-[2px]">
            <img src={HorizontalTopLeftMain} alt="" />
          </button>
        </div>
        <hr className='my-[.9rem] text-darkSlate'/>
        <div className="py-[.6rem] text-base font-bold w-full h-[12rem]">{translatedText}</div>
        <div className='flex gap-2'>
          <button className='border-2 border-slateGray p-[6px] rounded-xl'>
            <img src={SoundMaxFill} alt="" />
          </button>
          <button className='border-2 border-slateGray p-[6px] rounded-xl'>
            <img src={Copy} alt="" />
          </button>
        </div>
      </div>
    )
  }