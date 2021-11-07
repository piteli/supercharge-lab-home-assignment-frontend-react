export function hasErrorResponse(payloadResponse: any) {
    if('success' in payloadResponse) {
        if(payloadResponse.success) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}