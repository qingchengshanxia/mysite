<?php
	header("Content-type:text/html;charset=utf-8");
	$conn = new mysqli("localhost","qingchengshanxia","1989long","qingchengshanxia");
	if ($conn->connect_error) {
		die("连接数据库不成功".$conn->connect_error);
	}
	$conn->query("SET character_set_connection=utf8, character_set_results=utf8, character_set_client=binary");
	
	$id = $_POST['id'];

	$result = mysqli_query($conn, "SELECT * FROM readcount WHERE idname = '$id'");
	if ($row = mysqli_fetch_array($result)) {
		$num = $row['idvalue']+1;
		mysqli_query($conn,"UPDATE readcount SET idvalue=$num WHERE idname='$id'");
		echo $num;
	} else {
		$ins ="INSERT INTO readcount (idname, idvalue) VALUES ('$id', 1)";
		if ($conn->query($ins)) {
			echo 1;
		} 
	}

	$conn->close();
?>