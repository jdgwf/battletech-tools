// import {gapi} from 'gapi.client';
// import {AuthResult} from 'gapi.client';

// export function getData() {
//     let client_id = '',
//         scope = [
//             // View and manage the files in your Google Drive
//             'https://www.googleapis.com/auth/drive',

//             // View and manage its own configuration data in your Google Drive
//             'https://www.googleapis.com/auth/drive.appdata',

//             // View and manage Google Drive files and folders that you have opened or created with this app
//             'https://www.googleapis.com/auth/drive.file',

//             // View and manage metadata of files in your Google Drive
//             'https://www.googleapis.com/auth/drive.metadata',

//             // View metadata for files in your Google Drive
//             'https://www.googleapis.com/auth/drive.metadata.readonly',

//             // View the photos, videos and albums in your Google Photos
//             'https://www.googleapis.com/auth/drive.photos.readonly',

//             // View the files in your Google Drive
//             'https://www.googleapis.com/auth/drive.readonly',

//             // Modify your Google Apps Script scripts' behavior
//             'https://www.googleapis.com/auth/drive.scripts',
//         ],
//         immediate = true;
//     // ...

//     gapi.auth.authorize(
//         { client_id: client_id,
//             scope: scope,
//             immediate: immediate
//         },
//         authResult => {
//         if (authResult && !authResult.error) {
//             /* handle succesfull authorization */
//         } else {
//             /* handle authorization error */
//         }
//     });
// }
export var dummy: string = "12";