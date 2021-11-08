import { action, makeObservable, observable } from "mobx";
import { TOAST_BG_COLOR } from "../utils/constants/component.constant";

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

    setToastVisibilityColorAndMessage(visible: boolean, color: string = TOAST_BG_COLOR.SUCCESS, message: string = 'toast-message') {
        this.isToastVisible = visible;
        this.color = color;
        this.message = message;
    }

}