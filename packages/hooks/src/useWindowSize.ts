import { useEffect, useState } from 'react'

import useDebounce from './useDebounce'

export type IWindowSize = {
    height: number
    width: number
    isMobile: boolean
}

export const isBrowser = typeof window !== 'undefined'

export function useWindowSize(): IWindowSize {
    const [size, setSize] = useState<IWindowSize>(() => ({
        width: isBrowser ? document.documentElement.clientWidth : 0,
        height: isBrowser ? document.documentElement.clientHeight : 0,
        isMobile: isBrowser ? document.documentElement.clientWidth < 768 : false
    }))

    const onResize = (): void => {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        const isMobile = width < 768
        setSize({ width, height, isMobile })
    }

    useEffect(() => {
        if (isBrowser) {
            window.addEventListener('resize', onResize)
            return () => {
                window.removeEventListener('resize', onResize)
            }
        }
    }, [])

    return useDebounce(size, 500)
}
