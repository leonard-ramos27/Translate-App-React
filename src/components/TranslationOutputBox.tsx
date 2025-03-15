import LanguageButton from "./LanguageButton";
import LanguageDropdown from "./LanguagesDropdown";

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
      <div>
        <div>
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
        </div>
        <div>{translatedText}</div>
        <button onClick={handleSwitchLang}>Switch</button>
      </div>
    )
  }