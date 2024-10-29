import React from 'react'

export type IReminderProps = {
    title: React.ReactElement | string
    desc: React.ReactElement | string
    onClose?: () => void
    showClose?: boolean
}

const Reminder: React.FC<IReminderProps> = props => {
    const { title, onClose, desc, showClose = true } = props

    return (
        <div>
            <div>{title}</div>
            <div>{desc}</div>
            {showClose && <div onClick={onClose}>x</div>}
        </div>
    )
}

export default Reminder
