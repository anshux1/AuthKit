"use client"

import { createContext, useContext, type ReactNode } from "react"
import { Dictionary } from "~/utils/dictonaries"

type DictionaryContextProviderProps = {
  children: ReactNode
  dictionary: Dictionary
}
type DictionaryContextType = Pick<DictionaryContextProviderProps, "dictionary">

export const dictionaryContext = createContext({} as DictionaryContextType)

export const DictionaryContextProvider = ({
  children,
  dictionary,
}: DictionaryContextProviderProps) => {
  return (
    <dictionaryContext.Provider value={{ dictionary }}>
      {children}
    </dictionaryContext.Provider>
  )
}

export const useDictionary = () => {
  const context = useContext(dictionaryContext)

  if (!context) {
    throw new Error("LanguageContext must be used within LanguageContextProvider")
  }

  return context
}
