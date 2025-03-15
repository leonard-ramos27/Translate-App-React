interface LanguageDropdownProps {
    id: string,
    value: string,
    onChange: (lang: string) => void,
    languages: { code: string, name: string}[],
}


export default function LanguageDropdown({
    id, 
    value, 
    onChange, 
    languages
}: LanguageDropdownProps){
    return (
        <select 
            name={id} 
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}>
            {languages.map((lang) => (
            <option 
                value={lang.code} 
                key={lang.code}>
                {lang.name}
            </option>
            ))}
        </select>
    )
}