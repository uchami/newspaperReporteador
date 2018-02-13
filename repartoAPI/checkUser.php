<?php
$path = "php-jwt-master/src/";
include $path . 'JWT.php';
include $path . 'BeforeValidException.php';
include $path . 'ExpiredException.php';
include $path . 'SignatureInvalidException.php';

//error_reporting(0);
//ini_set('display_errors', 0);

use \Firebase\JWT\JWT;
$key = "newspaperAnotherKey";

$user = $_POST['identifier'];
$id = intval($_POST['id']);

// Create connection
$db = new PDO('mysql:host=190.228.29.65;dbname=newspaperxxi;charset=utf8', 'usuarionewspaper', '6up50OkFVDr2YEm9SAKWzfnGh3Rb1g', 
																								array(PDO::ATTR_EMULATE_PREPARES => false, 
                                                                                                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
header( "Access-Control-Allow-Origin: *");
header( "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
header ("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");

function checkUser($db, $user, $id) {
    $sql = "SELECT RptReparto_Habilitado FROM Usuarios ".
		"WHERE Identificacion = BINARY ? and ".
		"Id = ?";
	$stmt = $db->prepare($sql);
	$stmt->bindValue(1, $user, PDO::PARAM_STR);
	$stmt->bindValue(2, $id, PDO::PARAM_INT);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
 
$response = '{"data": "?" }';
try {
  $res = checkUser($db, $user, $id);
  $row = $res[0];
  if($row == null){
	  $token = '{
	  "status": false,
	  "error": "Check failed"
	}';
	$jwt = JWT::encode($token, $key);
	echo(str_replace("?",$jwt,$response));  
  } else {
	$token = '{ "status": true,"habilitado":'.$row['RptReparto_Habilitado'].'}';
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
