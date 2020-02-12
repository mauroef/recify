<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/recital.php';
 
$database = new Database();
$db = $database->getConnection();
 
$recital = new Recital($db);
 
$recital->id = isset($_GET['id']) ? $_GET['id'] : die();

$recital->readOne();

if($recital->date !== null) {

	$recital_arr = array(
		"id" => $recital->id,
		"date" => $recital->date,
		"ticket" => $recital->ticket,
		"band" => $recital->id_band,
		"place" => $recital->id_place		
	);
 
	http_response_code(200);

	echo json_encode($recital_arr);
}
 
else {

	http_response_code(404);

	echo json_encode(array("message" => "Recital does not exist."));
}
?>
