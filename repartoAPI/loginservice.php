<?php
$path = "php-jwt-master/src/";
include $path . 'JWT.php';
include $path . 'BeforeValidException.php';
include $path . 'ExpiredException.php';
include $path . 'SignatureInvalidException.php';

error_reporting(0);
ini_set('display_errors', 0);

use \Firebase\JWT\JWT;
$key = "newspaperKeyTest";

$user = $_POST['username'];
$pass = $_POST['password'];
$pass = str_replace("96bf6314b679ba43775964fdd65aa0e4","",base64_decode($pass));

// Create connection
$db = new PDO('mysql:host=localhost;dbname=newspaperxxi;charset=utf8mb4', 'root', '', array(PDO::ATTR_EMULATE_PREPARES => false, 
                                                                                                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

header( "Access-Control-Allow-Origin: *");
header( "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
header ("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");

function login($db, $user, $pass) {
    $sql = "SELECT ID, Identificacion, Usuario, Contrasena FROM Usuarios ".
		"WHERE RptReparto_Habilitado = 1 and ".
		"Usuario = ? and ".
		"Contrasena = ?";
	$stmt = $db->prepare($sql);
	$stmt->bindValue(1, $user, PDO::PARAM_STR);
	$stmt->bindValue(2, $pass, PDO::PARAM_STR);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
 
$response = '{"data": "?" }';
try {
  $res = login($db, $user, $pass);
  $row = $res[0];
  if($row == null){
	  $token = '{
	  "status": false,
	  "error": "Login failed"
	}';
	$jwt = JWT::encode($token, $key);
	echo(str_replace("?",$jwt,$response));
  } else {
	$token = '{ "status": true,"id":'. $row['ID'] .' , "username": "'.$row['Usuario'].'","identificacion": "'. $row['Identificacion'] . '"}';
	$jwt = JWT::encode($token, $key);
	echo(str_replace("?",$jwt,$response));  
  }
} catch(PDOException $ex) {
	$token = '{
	  "status": false,
	  "error": "error"
	}';
	$jwt = JWT::encode($token, $key);
	echo(str_replace("?",$jwt,$response));
}

?>
