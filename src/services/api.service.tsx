import { AUTHENTICATION_TYPE } from "../utils/constants/api.constant"

export default class ApiService {

    private getToken(){
        return 'token-from-server-is-here';
    }

    private getHeaders(authenticationType: string){
        let headers: any = {Accept: 'application/json', 'Content-Type': 'application/json'};

        if(
            authenticationType === AUTHENTICATION_TYPE.BASIC ||
            authenticationType === AUTHENTICATION_TYPE.BEARER
        ) {
            headers['Authentication'] = `${authenticationType} ${this.getToken()}`;
        }

        return headers;
    }

    post(path: string, payload: any, authenticationType: string) {
        return fetch(path, {body: JSON.stringify(payload), headers: this.getHeaders(authenticationType)})
    }

    
}