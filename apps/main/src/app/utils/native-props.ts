// from: https://github.com/ant-design/ant-design-mobile/blob/e59be88c12/src/utils/native-props.ts

import classNames from 'classnames'
import type { CSSProperties, ReactElement } from 'react'
import React from 'react'

export interface INativeProps<S extends string = never> {
    className?: string
    style?: CSSProperties & Partial<Record<S, string>>
    tabIndex?: number
}

export function withNativeProps<P extends INativeProps>(props: P, element: ReactElement): ReactElement {
    const p = {
        ...element.props
    }
    if (props.className) {
        p.className = classNames(element.props.className, props.className)
    }
    if (props.style) {
        p.style = {
            ...p.style,
            ...props.style
        }
    }
    if (props.tabIndex !== undefined) {
        p.tabIndex = props.tabIndex
    }
    for (const key in props) {
        if (!props.hasOwnProperty(key)) {
            continue
        }
        if (key.startsWith('data-') || key.startsWith('aria-')) {
            p[key] = props[key]
        }
    }
    return React.cloneElement(element, p)
}
