import './Toast.css';
import { inject, observer } from 'mobx-react';

function ToastComponent(
    {toastStore}: any
) {

    function removeToast(){
        toastStore.setToastVisibilityColorAndMessage(false);
        console.log(toastStore.isToastVisible);
    }

    return(
        <div onClick={removeToast} className="toast-container-overlay">
            <div className="toast-container" 
                style={{
                    backgroundColor: toastStore.color}}>
                {toastStore.message}
            </div>
        </div>
    );
}

export default inject('toastStore')(observer(ToastComponent));