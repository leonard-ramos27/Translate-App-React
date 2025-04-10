import ExpandDown from '../assets/Expand_down.svg'
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
        <div className={`relative btn-language px-0! ${languages.some(lang => value === lang.code) ? 'selected' : ''}`}>
            <select 
                name={id} 
                id={id}
                aria-label='Select a language'
                className={`bg-transparent appearance-none pl-3 pr-5 cursor-pointer focus-visible:outline-none `}
                value={ languages.some(lang => value === lang.code) ? value : ''}
                onChange={(e) => onChange(e.target.value)}>
                <option value="" hidden>Spanish</option>
                {languages.map((lang) => (
                <option 
                    value={lang.code} 
                    key={lang.code}
                    className="bg-darkSlate">
                    {lang.name}
                </option>
                ))}
            </select>
            <div className="absolute right-0.5 top-2.5 pointer-events-none">
                <img src={ExpandDown} alt="" />
            </div>
        </div>
    )
}