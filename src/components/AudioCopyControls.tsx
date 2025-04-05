import SoundMaxFill from '../assets/sound_max_fill.svg'
import Copy from '../assets/Copy.svg'
import { useState } from 'react'

interface AudioCopyControlsProps {
    style? : string,
    getText: () => string | undefined,
}

export default function AudioCopyControls({ style, getText}: AudioCopyControlsProps){
    const [copied, setCopied] = useState(false)

    const handleAudio = () => {
        const textToListen = getText()
        if(textToListen && 'speechSynthesis' in window){
            const utterance = new SpeechSynthesisUtterance(textToListen)
            speechSynthesis.speak(utterance)
        } else {
            alert('Sorry, it seems your browser does not support text to speech.')
        }
    }

    const handleCopy = async () => {
        const textToCopy = getText()
        console.log(textToCopy)
        if(textToCopy){
            await navigator.clipboard.writeText(textToCopy)
            setCopied(true)
            setTimeout(()=>{setCopied(false)}, 2000)
        }
    }

    return (
        <div className={`flex gap-2 relative ${style}`}>
          <button 
            onClick={handleAudio}
            className='border-2 border-slateGray text-slateGray p-[6px] rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition'>
            <img src={SoundMaxFill} alt="" />
          </button>
          <button 
            onClick={handleCopy}
            className='border-2 border-slateGray text-slateGray p-[6px] rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition'>
            <img src={Copy} alt="" />
          </button>
          {copied && (
            <span className='absolute bg-deepBlack text-white text-[10px] p-2 rounded -right-[10%] -bottom-[100%]'>
                Text copied!
            </span>
          )}
        </div>
    )
}