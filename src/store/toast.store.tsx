import { action, makeObservable, observable } from "mobx";

export default class ToastStore {
    isToastVisible: boolean = false;
    message: string = '';

    constructor() {
        makeObservable(
            this,
            {
                isToastVisible: observable,
                setToastVisibility: action
            }
        )
    }

    setToastVisibility(visible: boolean, message: string) {
        this.isToastVisible = visible;
        this.message = message;
    }

}