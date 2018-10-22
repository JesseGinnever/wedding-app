const apiEndpoint = "http://104.248.235.197:4000"
var GuestService = {};

GuestService.getGuestInfoByWeddingCode = function(weddingCode) {
    return fetch(apiEndpoint + "/guest/code/" + weddingCode);
}

GuestService.updateGuestInfo = function(invitationResponse) {
    return fetch(apiEndpoint + "/guest/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitationResponse)
    });
}

export default GuestService