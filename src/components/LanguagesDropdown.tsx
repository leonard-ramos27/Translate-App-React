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
        <div className=" relative">
            <select 
                name={id} 
                id={id}
                className={`btn-language appearance-none pr-4! ${languages.some(lang => value === lang.code) ? 'selected' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}>
                {languages.map((lang) => (
                <option 
                    value={lang.code} 
                    key={lang.code}
                    className="bg-deepBlack">
                    {lang.name}
                </option>
                ))}
            </select>
            <div className="absolute right-0.5 top-2.5">
                <img src={ExpandDown} alt="" />
            </div>
        </div>
    )
}