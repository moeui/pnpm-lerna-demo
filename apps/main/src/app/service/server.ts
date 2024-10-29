import { IPromise, request } from '@src/app/utils/request'

export interface IGeIPResponse {
    ip: string
}
export function getIP(data: { format: string }): IPromise<IGeIPResponse> {
    return request(`https://api64.ipify.org/?format=${data.format}`, {
        method: 'GET'
    })
}
