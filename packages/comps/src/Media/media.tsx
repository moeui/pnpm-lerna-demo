import { Skeleton } from 'antd'
import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import UAParser from 'ua-parser-js'

import { INativeProps, withNativeProps } from './native-props'

import css from './media.module.stylus'

type IProps = {
    src: string
    width?: number
    height?: number
    maxHeight?: number
    minHeight?: number
    onClick?: () => void
    resourceType?: IResourceType
    link?: string
    scale?: boolean
    ref?: React.RefObject<HTMLImageElement>
    preview?: boolean
    transparentBg?: boolean
    noBorder?: boolean
    autoPlay?: boolean
    placeholder?: string
    className?: string
} & INativeProps<'--width' | '--height'>

type IResourceType = 'image' | 'video' | 'audio' | 'svg'

const ua = new UAParser()
const isSafari = /Safari/gi.test(`${ua.getBrowser().name}`)

const Comp = (props: IProps): React.ReactElement | null => {
    const { className, src, onClick, link, scale, autoPlay } = props
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [type, setType] = useState<IResourceType>()
    const videoRef = useRef<HTMLVideoElement>(null)
    const [contentTypeLoading, setContentTypeLoading] = useState(false)

    useEffect(() => {
        if (src === undefined || src === '') {
            setError(true)
            setLoading(false)
            setType('image')
            return
        }
        setError(false)

        if (props.resourceType === 'svg') {
            setType('image')
            setLoading(false)
            return
        }

        if (/\.(jpg|jpeg|png|gif|svg|webp)/.test(src)) {
            setLoading(true)
            setType('image')
            return
        }

        if (!/\.(mp4|jpg|jpeg|png|gif|svg|webp)$/i.test(src) && /ipfs/i.test(src)) {
            const getContentType = async (): Promise<void> => {
                if (contentTypeLoading) {
                    return
                }
                try {
                    const req = await fetch(src, { method: 'HEAD' })
                    const contentType = req.headers.get('content-type')
                    setContentTypeLoading(true)
                    if (contentType) {
                        if (/mp4/i.test(contentType)) {
                            setLoading(true)
                            setType('video')
                        } else {
                            setType('image')
                            // fetchImage()
                        }
                    }
                } catch (er) {
                    //
                }
            }
            getContentType()
        } else {
            if (/\.(mp4)$/i.test(src) || props.resourceType === 'video') {
                setLoading(true)
                setType('video')
            } else if (props.resourceType === 'audio') {
            } else {
                setType('image')
                // fetchImage()
            }
        }
    }, [src])

    useEffect(() => {
        if (type === 'video') {
            videoOnLoaded()
        }
    }, [type, autoPlay])

    const videoOnLoaded = (): void => {
        setLoading(false)
        const dom = videoRef.current
        if (!dom) {
            setError(true)
            return
        }
        const isPlay = autoPlay || autoPlay === undefined
        const playPromise = isPlay ? dom.play() : dom.pause()
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Automatic playback started!
                })
                .catch(e => {
                    //
                })
        }
    }

    const renderLoadingError = (): React.ReactElement | null => {
        if (loading) {
            return (
                <div className={css.error}>
                    <Skeleton.Button active style={{ height: '100%', width: '100%' }} className={css.error} />
                </div>
            )
        }
        // if (loading || error || !src) {
        //     let errorSrc = isDark ? '/img/default_dark.jpg' : '/img/default.jpg'
        //     if (props.placeholder) {
        //         errorSrc = props.placeholder
        //     }
        //     return (
        //         <div className={css.error}>
        //             <img src={errorSrc} />
        //         </div>
        //     )
        // }
        return null
    }

    const imgDom = (): React.ReactElement | null => {
        if (error || !type) {
            return null
        }

        if (type === 'video') {
            const videoUrl = src?.replace(/AUTOx\d00\//, '')

            return (
                <video
                    style={{ objectFit: 'cover', height: '100%', width: '100%', display: 'block' }}
                    loop
                    preload="true"
                    src={videoUrl}
                    ref={videoRef}
                    onCanPlay={() => videoOnLoaded()}
                    onError={() => setError(true)}
                    onLoadStart={() => setLoading(true)}
                    muted
                    onClick={() => onClick && onClick()}
                />
            )
        }

        return (
            <img
                className={classnames(css.img, { [css.isSafari]: isSafari })}
                onClick={() => onClick && onClick()}
                src={src}
                onError={() => {
                    setError(true)
                    setLoading(false)
                }}
                onLoad={() => {
                    setError(false)
                    setLoading(false)
                }}
            />
        )
    }

    return withNativeProps(
        props,
        <div
            className={classnames(css.image, className, { [css.scale]: scale, [css.noBorder]: props.noBorder })}
            ref={props.ref}
            style={{ ...{ height: props.height, width: props.width, maxHeight: props.maxHeight, minHeight: props.minHeight } }}
        >
            {link ? (
                <Link to={link} style={{ width: '100%', height: '100%' }}>
                    {imgDom()}
                </Link>
            ) : (
                imgDom()
            )}
            {renderLoadingError()}
        </div>
    )
}
export default Comp
