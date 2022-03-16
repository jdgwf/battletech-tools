const propertyID = 1;

export function callAnalytics(
    host: string,
    url: string,
    appSessionID: string = "",
) {
    if( typeof(fetch) != "undefined" ) {
        fetch('https://analytics.jdgwf.com/analytics/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "property=" + propertyID.toString() + "&url=" + encodeURI(url) + "&host=" + encodeURI(host) + "&app_session_id=" + encodeURI(appSessionID),
        })
        .then(async (response) => {
            // response.json()
            // console.log( await response.text() )
        })
        .then((data) => {
        //   console.log('Success:', data);
        })
        .catch((error) => {
        //   console.error('Error:', error);
        });

    }
}