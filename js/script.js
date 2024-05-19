
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
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert("Login successful! Your unique key is: " + response.key);
                closeLoginForm();
            } else {
                alert("Login failed: " + response.message);
            }
        }
    };
    xhr.send("username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
function openVouches() {
    document.getElementById('vouchesWindow').style.display = 'block';
}

function closeVouches() {
    document.getElementById('vouchesWindow').style.display = 'none';
}
function openPurchaseWindow() {
    document.getElementById('purchaseWindow').style.display = 'block';
}

function closePurchaseWindow() {
    document.getElementById('purchaseWindow').style.display = 'none';
}

function purchaseAccounts() {
    const numAccounts = parseInt(document.getElementById('numAccounts').value);
    const totalPrice = numAccounts * 4; // 4 EUR per account
    alert("You have purchased " + numAccounts + " account(s) for a total of " + totalPrice + " EUR.");
}
