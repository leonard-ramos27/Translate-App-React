import { useMemo } from "react";
import { detect } from "tinyld";

export function useDetectLanguage(text: string, sourceLang: string) {
    return useMemo(() => {
        if(sourceLang !== "auto"){
            return sourceLang
        }
        return detect(text)
    }, [text, sourceLang])
} 