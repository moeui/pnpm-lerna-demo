/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from 'i18next'
import { getQueryStringByName } from 'mobile-browser'

import storage from '@/app/utils/storage'

const query = getQueryStringByName('lng')
let language = storage.get('language')

if (query) {
    language = query
    storage.set('language', query)
    storage.set('lng', query)
}
if (!language) {
    // if (navigator.appName === 'Netscape') {
    //     language = navigator.language
    // } else {
    //     language = (navigator as any).userLanguage
    // }
    // const sec = language.split('-')
    // if (sec[1]) {
    //     sec[1] = sec[1].toUpperCase()
    //     storage.set('language', `${sec[0]}_${sec[1]}`)
    // }
    storage.set('language', `en_US`)
    language = 'en_US'
}

export const LANGUAGE_LIST = [
    {
        name: 'English',
        value: 'en_US'
    },
    {
        name: 'Русский',
        value: 'ru'
    },
    {
        name: '简体中文',
        value: 'zh_CN'
    }
]

export const changeLanguage = (lang: string): void => {
    storage.set('language', lang)
    i18n.changeLanguage(lang)
}

export const currentLanguageName = (): string => {
    const lang = storage.get('language')
    return LANGUAGE_LIST.find(item => item.value === lang)?.name || 'English'
}

export default language
