import { action, makeObservable, observable } from "mobx";

export default class ToastStore {
    isToastVisible: boolean = false;
    message: string = '';
    color: string = '';

    constructor() {
        makeObservable(
            this,
            {
                isToastVisible: observable,
                message: observable,
                color: observable,
                setToastVisibilityColorAndMessage: action
            }
        )
    }

    setToastVisibilityColorAndMessage(visible: boolean, color: string, message: string) {
        this.isToastVisible = visible;
        this.color = color;
        this.message = message;
    }

}