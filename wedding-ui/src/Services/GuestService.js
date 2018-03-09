const apiEndpoint = "http://localhost:4000"
var GuestService = {};

GuestService.getGuestInfoByWeddingCode = function(weddingCode) {
    console.log("getGuestInfoByWeddingCode:" + weddingCode)
    return fetch(apiEndpoint + "/guest/code/" + weddingCode);
}

GuestService.updateUserInfo = function(invitationResponse) {
    fetch(apiEndpoint + "/guest/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitationResponse)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("getUserInfoByWeddingCode response:" + responseJson)
      return responseJson;
    })
    .catch((error) => {
        console.error(error);
    });
}

export default GuestService