<?php
	$conn = new mysqli("localhost","qingchengshanxia","1989long","qingchengshanxia");
	if (!$conn) {
		echo "Error:".$conn->connect_error;
	}
	echo "连接成功"."<br>";
	$conn->query("SET character_set_connection=utf8, character_set_results=utf8, character_set_client=binary");

	$name = $email = $txt ="";
	$a = $b = $c = '';
	if ($_SERVER["REQUEST_METHOD"]=="GET") {
		if(empty($_GET['username'])){
			$a = false;
		} else {
			$name = test_input($_GET['username']);
			$a = true;
		}
		if (empty($_GET['useremail'])) {
			$b = false;
		} else {
			if (preg_match("/^([\w\-]+\@[\w\-]+\.[\w\-]+)$/", test_input($_GET['useremail']))) {
				$email = test_input($_GET['useremail']);
				$b = true;
			} else {
				$b = false;
			}
		}
		if (empty($_GET['content'])) {
			$c = false;
		} else {
			$txt = test_input($_GET['content']);
			$c = true;
		}
	} else {
		echo "请求失败";
	}

	function test_input($data){
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
	if ($a && $b && $c) {
		$sub = "INSERT INTO chat (name, email, txt) VALUES ('$name', '$email', '$txt')";
		if ($conn->query($sub) === TRUE) {
			echo '插入成功';
		} else {
			echo "Error:".$sub."<br>".$conn->error;
		}
	}else {
		echo '验证失败';
	}

	$conn->close();
?>