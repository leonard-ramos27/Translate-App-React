
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
          {languages.map((lang) => (
            <label htmlFor={`btn-translated-lang-${lang.code}`} key={lang.code}>
              <input 
                type="radio"
                id={`btn-translated-lang-${lang.code}`}
                name='translated-langugage'
                value={lang.code}
                checked={targetLang == lang.code}
                onChange={(e) => handleChangeTargetLang(e.target.value)} />
              <span>{lang.name}</span>
            </label>
          ))}
        </div>
        <div>{translatedText}</div>
        <button onClick={handleSwitchLang}>Switch</button>
      </div>
    )
  }