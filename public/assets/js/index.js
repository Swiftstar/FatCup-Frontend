var user = firebase.auth().currentUser;

if (user) {
    // User is signed in.
    console.log('sign in');
} else {
    // No user is signed in.
    console.log('not sign in');
}

$('#phoneInput').hide();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var phone = user.phone;
        var providerData = user.providerData;
        // ...
        console.log(uid);
        if (displayName)
            $('#name').text("Hello " + displayName + "!");
        else if (phone)
            $('#name').text("Hello " + phone + "!");
        else
            $('#name').text("Hello Guest!");
        $('#login').text("logout");
        $('#login').click(function () {
            firebase.auth().signOut();
        });
        $("#headimg").attr("src", photoURL);

        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            // Send token to your backend via HTTPS
            // ...
            console.log(idToken);
            $.ajax({
                url: "http://localhost:8080/customer/user/check",
                type: "POST",
                headers: {
                    'Authorization': idToken,
                },
                complete: function (data, textStatus, jqXHR) {
                    console.log(textStatus);
                },
                success: function (result, textStatus, jqXHR) {
                    var data = result.data;

                    if (!data.isuser) {
                        $('#phoneInput').show();
                    }
                    console.log(data);
                }
            });
        }).catch(function (error) {
            // Handle error
        });
    } else {
        // User is signed out.
        // ...
        $('#name').text("Hello!");
        $('#login').text("login");
        $('#login').click(function () {
            window.location = 'login';
        });
        $("#headimg").attr("src", "");
        $('#phoneInput').hide();
    }
});

$('#phoneBtn').click(function (e) {
    submitPhone();
});

function submitPhone() {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        $.ajax({
            url: "http://localhost:8080/customer/user/add",
            type: "POST",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({
                name: "HenryZheng",
                phone: "+886930997376",
                birth: "1990-12-01",
                gender: "M",
                logintype: "C"
            }),
            headers: {
                'Authorization': idToken,
            },
            complete: function (data, textStatus, jqXHR) {
                console.log(textStatus);
            },
            success: function (result, textStatus, jqXHR) {
                var data = result.data;

                if (!data.isuser) {
                    window.location.reload();
                }
                console.log(data);
            }
        });
    }).catch(function (error) {
        // Handle error
    });
}