
import TranslationInputForm from './components/TranslationInputForm'
import TranslationOutputBox from './components/TranslationOutputBox'
import './App.css'
import Logo from './assets/logo.svg'

const languages = [
  { code: "en", name: "English"}, 
  { code: "fr", name: "French"}, 
  { code: "es", name: "Spanish"},
  { code: "it", name: "Italian"},
  { code: "de", name: "German"},
]

function App() {
  return (
    <main className='mx-3 lg:mx-[4.5rem] my-10 lg:my-[5.7rem] text-lightGray'>
      <div className='flex justify-center mb-[3.3rem]'>
        <img src={Logo} alt="" />
      </div>
      <div className='flex flex-col xl:flex-row xl:justify-between gap-4 lg:gap-[0.8rem] xl:gap-[0.8rem]'>
        <TranslationInputForm 
          languages={languages}
          />
        <TranslationOutputBox 
          languages={languages}
          />
      </div>
    </main>
  )
}

export default App
