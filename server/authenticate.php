<?php
function generateUniqueKey() {
    return bin2hex(random_bytes(16));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $file = 'namepass.txt';
    $webhook_url = 'https://discord.com/api/webhooks/1241436314482642954/2TQqKVbTJUCn5KISk0dngHvUftAm7aNa-7O8-D1Fqxm_ovUYc0V8ie8BI4a0Eks1Tar8';

    $credentials = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $authenticated = false;

    foreach ($credentials as $credential) {
        list($stored_username, $stored_password) = explode(':', $credential);
        if ($username === $stored_username && $password === $stored_password) {
            $authenticated = true;
            break;
        }
    }

    if ($authenticated) {
        $unique_key = generateUniqueKey();
        $message = "New login successful!\nUsername: $username\nUnique Key: $unique_key";

        $data = json_encode([
            "content" => $message,
            "username" => "Sillys Bot"
        ]);

        $ch = curl_init($webhook_url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        echo json_encode(['success' => true, 'key' => $unique_key]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }
}
?>
