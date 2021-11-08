import './LoadingSpinner.css';
import { inject, observer } from 'mobx-react';

function LoadingSpinnerComponent(
    {loadingSpinnerStore}: any
): any {
    return(
            <div className="loading-container-overlay">
                <div 
                    className="loader" 
                >
                </div>
                <h4>{loadingSpinnerStore.message}</h4>
            </div>
    );
}

export default inject('loadingSpinnerStore')(observer(LoadingSpinnerComponent));