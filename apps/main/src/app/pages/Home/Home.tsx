import classnames from 'classnames'
import React, { useEffect } from 'react'
import { useWindowSize } from 'hooks'
import GradientButton from '@src/app/components/GradientButton'

const Comp = (): React.ReactElement => {
    const { width } = useWindowSize()
    return (
        <div className={classnames('page-home')}>
            <GradientButton>{width}</GradientButton>
        </div>
    )
}

export default Comp
