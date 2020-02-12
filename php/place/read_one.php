<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/place.php';
 
$database = new Database();
$db = $database->getConnection();
 
$place = new Place($db);
 
$place->id = isset($_GET['id']) ? $_GET['id'] : die();

$place->readOne();

if($place->name != null) {

	$place_arr = array(
		"id" =>  $place->id,
		"name" => $place->name,        
	);
 
	http_response_code(200);

	echo json_encode($place_arr);
}
 
else {

	http_response_code(404);

	echo json_encode(array("message" => "Place does not exist."));
}
?>
