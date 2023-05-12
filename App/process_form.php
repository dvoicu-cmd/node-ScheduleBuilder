<?php

// Set up database connection
$host = "localhost"; // your host name
$username = "your_username"; // your database username
$password = "your_password"; // your database password
$dbname = "TestTable"; // your database name

$conn = mysqli_connect($host, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

// Prepare SQL statement
$sql = "INSERT INTO form_data (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')";

// Execute SQL statement
if (mysqli_query($conn, $sql)) {
    echo "Form data stored successfully!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// Close database connection
mysqli_close($conn);

?>
