import { useWeb3React } from '@web3-react/core'
import { Modal } from 'antd'
import classnames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import Icon from '@/app/components/Icon'
import Loading from '@/app/components/Loading'
import { useLogin } from '@/app/components/Login'
import { useReminder } from '@/app/components/Reminder'
import { urlPath } from '@/app/router/urlPath'
import { getIP } from '@/app/service/server'
import { useThemeContext } from '@/theme'

import { dialogState } from './state'

const Comp = (): React.ReactElement => {
    const { chainId, account, connector, provider } = useWeb3React()

    const { isMobile, themeName, changeTheme } = useThemeContext()
    const [isShowDialog, setShowDialog] = useRecoilState(dialogState)
    const nav = useNavigate()
    const { t, i18n } = useTranslation()
    // const fetchData = async () => {
    //     const data = await getIP()
    //     // eslint-disable-next-line no-console
    //     console.log(data)
    // }

    // const { isLoading, error, data } = useQuery('repoData', () => getIP())
    // console.log(isLoading, data)
    const { mutate: fetchIP, isLoading, data } = useMutation((params: { format: string }) => getIP({ format: params.format }))
    const { reminder, onClose, onShow, visible } = useReminder({
        title: 'reminder title',
        desc: account || 'reminder desc'
    })

    const { login, onShow: onShowLogin } = useLogin()

    return (
        <div className={classnames('layout-home')}>
            <div>
                {isMobile ? 'mobile' : 'pc'} {themeName} home
            </div>

            <div onClick={() => changeTheme(themeName !== 'dark' ? 'dark' : 'light')}>change theme</div>
            {/* <div onClick={() => fetchData()}>fetchData</div> */}
            <div onClick={() => fetchIP({ format: 'json' })}>
                fetchIP: {data?.data.ip}
                {isLoading && <Loading />}
            </div>

            <div onClick={() => setShowDialog(true)}>show dialog</div>
            <Modal open={isShowDialog} onCancel={() => setShowDialog(false)}>
                xxx11
                <Icon name="copy" />
            </Modal>
            <div onClick={() => nav(urlPath.page1)}>Page1</div>
            <div onClick={() => i18n.changeLanguage(i18n.language === 'en_US' ? 'zh_CN' : 'en_US')}>
                language: {i18n.language} exp: {t('accept')}
            </div>
            {reminder}
            <div onClick={() => (visible ? onClose() : onShow())}>{visible ? 'onClose' : 'onShow'} reminder</div>

            <div className="box">
                <div className="item">x1</div>
                <div className="item">x2</div>
            </div>

            <div onClick={onShowLogin}>login wallet</div>
            {login}
        </div>
    )
}

export default Comp
