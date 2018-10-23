const apiEndpoint = "https://www.jesseginnever.com/api/";
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