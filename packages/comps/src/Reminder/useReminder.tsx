import React, { useCallback, useState } from 'react'

import Reminder, { IReminderProps } from './Reminder'

interface IUseReminder {
    reminder: React.FunctionComponentElement<IReminderProps> | null
    visible: boolean
    onClose: () => void
    onShow: () => void
}

export const useReminder = (props: Omit<IReminderProps, 'onClose'>): IUseReminder => {
    const [visible, setShow] = useState(false)

    const onClose = useCallback(() => {
        setShow(false)
    }, [])

    const onShow = useCallback(() => {
        setShow(true)
    }, [])

    const reminder = React.cloneElement(<Reminder {...props} />, {
        onClose
    })

    if (visible) {
        return { visible, reminder, onClose, onShow }
    }
    return { visible, reminder: null, onClose, onShow }
}
