import classnames from 'classnames'
import React from 'react'

import css from './loading.module.stylus'

interface ICSSPropertiesProgressBar extends React.CSSProperties {
    '--width': string
    '--height': string
    '--border': string
}

interface IProps {
    className?: string
    size?: keyof ISizes
    border?: number
    width?: number
    height?: number
}

type IStyles = {
    width: number
    height: number
}

interface ISizes {
    sm: IStyles
    md: IStyles
    lg: IStyles
}

const sizes: ISizes = {
    sm: { width: 24, height: 24 },
    md: { width: 40, height: 40 },
    lg: { width: 60, height: 60 }
}

const Loading = (props: IProps): React.ReactElement => {
    const styles = props.size ? { ...sizes[props.size] } : sizes['sm']
    return (
        <div className={classnames(css.loading, props.className)}>
            <span
                className={css.loadingIcon}
                style={
                    {
                        '--width': `${props.width || styles.width}px`,
                        '--height': `${props.height || styles.height}px`,
                        '--border': `${props.border || 5}px solid var(--var-button-background)`
                    } as ICSSPropertiesProgressBar
                }
            />
        </div>
    )
}
export default Loading
