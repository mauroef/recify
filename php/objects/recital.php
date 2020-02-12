<?php
class Recital {
 
  private $conn;
  private $table_name = "recital";

  public $id;
  public $date;
  public $ticket;
  public $id_band;
  public $id_place;

  public function __construct($db){
    $this->conn = $db;
  }

  function read() {
	
    $query = "SELECT r.id, r.date, b.name AS 'band', p.name AS 'place', r.ticket
              FROM " . $this->table_name . " r 
              JOIN band b ON r.id_band = b.id
              JOIN place p ON r.id_place = p.id";    

		$stmt = $this->conn->prepare($query);

		$stmt->execute();

		return $stmt;
  }
  
  function readOne() {

		$query = "SELECT r.id, r.date, b.name AS 'band', p.name AS 'place', r.ticket
              FROM " . $this->table_name . " r 
              JOIN band b ON r.id_band = b.id
              JOIN place p ON r.id_place = p.id
              WHERE r.id = ?
              LIMIT 0,1";
		
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(1, $this->id);

    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $this->date = $row['date'];
    $this->ticket = $row['ticket'];
    $this->id_band = $row['band'];
    $this->id_place = $row['place'];
  }

  function create() {

    $query = "INSERT INTO " . $this->table_name . " 
              SET date=:date, ticket=:ticket, id_band=:id_band, id_place=:id_place";

		$stmt = $this->conn->prepare($query);

    $this->date = htmlspecialchars(strip_tags($this->date));
    $this->ticket = htmlspecialchars(strip_tags($this->ticket));
    $this->id_band = htmlspecialchars(strip_tags($this->id_band));
    $this->id_place = htmlspecialchars(strip_tags($this->id_place));

    $stmt->bindParam(":date", $this->date);
    $stmt->bindParam(":ticket", $this->ticket);
    $stmt->bindParam(":id_band", $this->id_band);
    $stmt->bindParam(":id_place", $this->id_place);

    if($stmt->execute()){
      return true;
		}

		return false;

  }
  
  function update() {

		$query = "UPDATE " . $this->table_name . " 
							SET date = :date, ticket = :ticket, id_band = :id_band, id_place = :id_place 
							WHERE id = :id";

		$stmt = $this->conn->prepare($query);

    $this->date = htmlspecialchars(strip_tags($this->date));
    $this->ticket = htmlspecialchars(strip_tags($this->ticket));
    $this->id_band = htmlspecialchars(strip_tags($this->id_band));
    $this->id_place = htmlspecialchars(strip_tags($this->id_place));
		$this->id = htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(':date', $this->date);
    $stmt->bindParam(':ticket', $this->ticket);
    $stmt->bindParam(':id_band', $this->id_band);
    $stmt->bindParam(':id_place', $this->id_place);
		$stmt->bindParam(':id', $this->id);

    if($stmt->execute()) {
			return true;
    }

    return false;
  }
  
  function delete() {
		
		$query = "DELETE FROM " . $this->table_name . " 
							WHERE id = ?";

    $stmt = $this->conn->prepare($query);

    $this->id = htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(1, $this->id);

    if($stmt->execute()) {
			return true;
    }

		return false;
		
	}
  
}

