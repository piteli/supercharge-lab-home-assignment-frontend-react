import './Toast.css';
import { toastPropertyType } from './Toast.model';
import { inject } from 'mobx-react';

function ToastComponent(
    property: toastPropertyType,
    {loadingSpinnerStore}: any
) {

    function removeToast(){
        loadingSpinnerStore.SetLoadingVisibility(false);
        console.log(loadingSpinnerStore.isLoadingVisible);
    }

    return(
        <div onClick={removeToast} className="toast-container-overlay">
            <div className="toast-container" 
                style={{
                    color: property.color, 
                    backgroundColor: property.backgroundColor}}>
                {property.message}
            </div>
        </div>
    );
}

export default inject('loadingSpinnerStore')(ToastComponent);