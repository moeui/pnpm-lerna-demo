import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.withCredentials = false
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function checkStatus(response: AxiosResponse): AxiosResponse {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText) as Error & {
        response: AxiosResponse
    }
    error.response = response
    throw error
}

export async function request<T>(reqUrl: string, options: AxiosRequestConfig = { method: 'GET' }): Promise<AxiosResponse<T>> {
    try {
        const response = await axios(reqUrl, options)
        return checkStatus(response)
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            throw new Error(`Request failed with status ${err.response.status}: ${err.response.statusText}`)
        }
        throw err
    }
}

export type IPromise<T> = Promise<AxiosResponse<T>>
