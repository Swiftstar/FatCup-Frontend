// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: '/fatcup/public',
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            var credential = authResult.credential;
            var isNewUser = authResult.additionalUserInfo.isNewUser;
            var providerId = authResult.additionalUserInfo.providerId;
            var operationType = authResult.operationType;
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            console.log('success!!!');

            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                // Send token to your backend via HTTPS
                // ...
                console.log(idToken);
            }).catch(function (error) {
                // Handle error
            });
            return true;
        },
        signInFailure: function (error) {
            // Some unrecoverable error occurred during sign-in.
            // Return a promise when error handling is completed and FirebaseUI
            // will reset, clearing any UI. This commonly occurs for error code
            // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
            // occurs. Check below for more details on this.
            return handleUIError(error);
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
    },
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {   provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'TW',
            whitelistedCountries: ['TW', 'KH']
        },
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
};
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
