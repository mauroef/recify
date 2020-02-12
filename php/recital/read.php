<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
include_once '../config/database.php';
include_once '../objects/recital.php';
 
$database = new Database();
$db = $database->getConnection();
 
$recital = new Recital($db);
 
$stmt = $recital->read();
$num = $stmt->rowCount();

if($num > 0) {
 
	$recital_arr = array();
	$recital_arr["records"] = array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

		extract($row);

		$recital_item = array(
			"id" => $id,
			"date" => $date,
			"band" => $band,
			"place" => $place,
			"ticket" => $ticket
		);

		array_push($recital_arr["records"], $recital_item);
	}
 	
	http_response_code(200);

	echo json_encode($recital_arr);
} 
else {
 	
	http_response_code(404);
	
	echo json_encode(
		array("message" => "No recital found.")
	);
}
