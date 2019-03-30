<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
include_once '../config/database.php';
include_once '../objects/place.php';
 
$database = new Database();
$db = $database->getConnection();
 
$place = new Place($db);
 
$stmt = $place->read();
$num = $stmt->rowCount();

if($num > 0) {
 
	$place_arr = array();
	$place_arr["records"] = array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

		extract($row);

		$place_item = array(
			"id" => $id,
			"name" => $name,                     
		);

		array_push($place_arr["records"], $place_item);
	}
 	
	http_response_code(200);

	echo json_encode($place_arr);
} 
else {
 	
	http_response_code(404);
	
	echo json_encode(
		array("message" => "No place found.")
	);
}
