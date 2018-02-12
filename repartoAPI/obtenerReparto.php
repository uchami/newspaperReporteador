<?php
header( "Access-Control-Allow-Origin: *");
header( "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
header ("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");

	$id = $_GET['identifier'];
	$reparto = "";

	if($id != null){
		$url = "../assets/files/".$id;
		if(!$reparto = @file_get_contents($url)){	 
			http_response_code(404);
			echo("Not found");
		}
	}
	echo($reparto);
?>
