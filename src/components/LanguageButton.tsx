interface LanguageButtonProps {
    id: string,
    code: string,
    checked: boolean,
    text: string,
    onChange: (lang: string) => void
}

export default function LanguageButton({
    id, 
    code, 
    checked, 
    text, 
    onChange
}: LanguageButtonProps){
    return (
        <label 
            htmlFor={id}
            className={`btn-language ${ checked ? 'selected' : '' }`}>
            <input 
              type="radio"
              id={id}
              name={id}
              value={code}
              checked={checked}
              onChange={(e) => onChange(e.target.value)} 
              className="hidden"/>
            <span>{text}</span>
        </label>
    )
}