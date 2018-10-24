const apiEndpoint = process.env.REACT_APP_API_URL;
let GuestService = {};

GuestService.getGuestInfoByWeddingCode = function(weddingCode) {
    return fetch(apiEndpoint + "/guest/code/" + weddingCode);
};

GuestService.updateGuestInfo = function(invitationResponse) {
    return fetch(apiEndpoint + "/guest/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitationResponse)
    });
};

export default GuestService