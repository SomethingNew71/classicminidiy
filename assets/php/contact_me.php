<?php
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
$subject = $_POST['subject'];
	
// create email body and send it	
$to = 'myemail@mail.com'; //Just write your email, no more :)
$email_subject = "Contact form submitted by:  $name";
$email_body = "You have received a new message. <br/>".
			  "Here are the details: <br/><br/> Name: $name <br/><br/> Subject: $subject<br/><br/> ".
		      "Email: $email_address <br/><br/> Message: <br/> $message";
$headers="From:<$email_address>\n";
$headers.="Content-Type:text/html; charset=UTF-8";
if($email_address != "") {
	mail($to,$email_subject,$email_body,$headers);
	return true;
}

?>