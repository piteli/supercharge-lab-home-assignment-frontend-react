export default class StorageService {
    
    setLocalStorage(data: any, key: string) {
        const stringData = JSON.stringify(data);
        localStorage.setItem(key, stringData);
    }    

    getLocalStorage(key: string) {
        const stringData = localStorage.getItem(key);
        if(stringData === null) {
            return null;
        }
        return JSON.parse(stringData);
    }
}