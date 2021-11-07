import { loadingSpinnerPropertyType } from "./LoadingSpinner.model";

export function LoadingSpinnerComponent(
    property: loadingSpinnerPropertyType = {color: 'black', size: 20}
): any {
    return <div 
                className="loader" 
                style={{
                    color: property.color,
                    fontSize: property.size    
                }}>
                </div>;
}