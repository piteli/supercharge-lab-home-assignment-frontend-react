import { action, makeObservable, observable } from "mobx";

export default class LoadingSpinnerStore {
    isLoadingVisible: boolean = false;
    message: string = 'Loading...';

    constructor() {
        makeObservable(
            this,
            {
                isLoadingVisible: observable,
                message: observable,
                SetLoadingVisibilityAndMessage: action
            }
        )
    }

    SetLoadingVisibilityAndMessage(visible: boolean, message: string = 'Loading...') {
        this.isLoadingVisible = visible;
        this.message = message;
    }

}