function openLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
}

function closeLoginForm() {
    document.getElementById('loginForm').style.display = 'none';
}

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "server/authenticate.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                window.location.href = "https://example.com/success?key=" + response.key;  // Change this URL to the desired destination
            } else {
                alert("Login failed: " + response.message);
            }
        }
    };
    xhr.send("username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
}
