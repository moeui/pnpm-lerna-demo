import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import resources from '@/app/lng'
import language from '@/app/utils/language'
import storage from '@/app/utils/storage'

let lng = language ? language.split('-').join('_') : 'en_US'

if (!resources[lng]) {
    lng = 'en_US'
    storage.set('language', 'en_US')
}

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en_US',
        resources,
        lng,
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })

export default i18n
