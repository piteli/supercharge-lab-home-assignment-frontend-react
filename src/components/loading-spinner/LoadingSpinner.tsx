import { loadingSpinnerPropertyType } from "./LoadingSpinner.model";
import './LoadingSpinner.css';

export function LoadingSpinnerComponent(
    property: loadingSpinnerPropertyType = 
        {
            color: 'black', 
            size: 20, 
            message: 'Loading...'
        },
): any {
    return(
            <div className="loading-container-overlay">
                <div 
                    className="loader" 
                    style={{
                        color: property.color,
                        fontSize: property.size    
                    }}>
                </div>
                <h4>{property.message}</h4>
            </div>
    );
}