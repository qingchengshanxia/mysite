<?php
	header("Content-type:text/html;charset=utf-8");
	$conn = new mysqli("localhost","qingchengshanxia","1989long","qingchengshanxia");
	if ($conn->connect_error) {
		die("连接数据库不成功".$conn->connect_error);
	}
	echo "连接数据库成功！";
	$conn->query("SET character_set_connection=utf8, character_set_results=utf8, character_set_client=binary");

	$sql = "CREATE TABLE chat (
				id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
				name VARCHAR(30) NOT NULL,
				email VARCHAR(30) NOT NULL,
				txt VARCHAR(3600) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
				reg_date TIMESTAMP
			)";
	if ($conn->query($sql) === TRUE) {
		echo "创建表成功"."<br>";
	} else {
		echo "创建表失败".$conn->error."<br>";
	}

	$conn->close();
?>