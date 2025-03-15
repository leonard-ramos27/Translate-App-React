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
        <label htmlFor={id}>
            <input 
              type="radio"
              id={id}
              name='original-language'
              value={code}
              checked={checked}
              onChange={(e) => onChange(e.target.value)} />
            <span>{text}</span>
        </label>
    )
}