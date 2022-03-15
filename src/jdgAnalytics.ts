const propertyID = 1;

export function callAnalytics(
    url: string,
) {
    if( typeof(fetch) != "undefined" ) {
        fetch('https://analytics.jdgwf.com/analytics/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "property=" + propertyID.toString() + "&url=" + encodeURI(url),
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