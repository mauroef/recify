<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/database.php';
 
include_once '../objects/recital.php';
 
$database = new Database();
$db = $database->getConnection();
 
$recital = new Recital($db);
 
$data = json_decode(file_get_contents("php://input"));
 
if (!empty($data->date) && !empty($data->ticket) &&
		!empty($data->id_band) && !empty($data->id_place)) {
 
	$recital->date = $data->date;
	$recital->ticket = $data->ticket;
	$recital->id_band = $data->id_band;
	$recital->id_place = $data->id_place;

	if($recital->create()) {

		http_response_code(201);

		echo json_encode(array("message" => "Recital was created."));
	}

	else {

		http_response_code(503);

		echo json_encode(array("message" => "Unable to create recital."));
	}
}

else {

		http_response_code(400);
		
    echo json_encode(array("message" => "Unable to create recital. Data is incomplete."));
}
?>
