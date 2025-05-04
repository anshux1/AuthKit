const dictionaries = {
  en: () => import("../../public/locale/en.json").then((r) => r.default),
} as const

export const getDictionary = () => dictionaries["en"]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
