import { atom, useRecoilState } from 'recoil'

export interface IGlobalStore {
    account: string
    btcAccount: string
    walletType: string
    message: {
        type: 'error' | 'success'
        content: string
    } | null
}

export const globalState = atom<IGlobalStore>({
    key: 'globalState',
    default: {
        account: '',
        btcAccount: '',
        walletType: '',
        message: null
    }
})

export function useUpdateGlobalState(): (newState: Partial<IGlobalStore>) => IGlobalStore {
    const [globalStore, setGlobalState] = useRecoilState(globalState)
    return (newState: Partial<IGlobalStore>) => {
        const updatedState = { ...globalStore, ...newState }
        setGlobalState(updatedState)
        return updatedState
    }
}

// export function useUpdateGlobalState(): (newState: Partial<IGlobalStore>) => void {
//     const setGlobalState = useSetRecoilState(globalState)

//     return (newState: Partial<IGlobalStore>) => {
//         setGlobalState(prevState => ({ ...prevState, ...newState }))
//     }
// }
