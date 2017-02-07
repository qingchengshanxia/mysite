<?php
	// 创建一个存储各页面id名和点赞数的database；
	$conn = new mysqli('localhost', 'qingchengshanxia', '1989long','qingchengshanxia');
	if ($conn->connect_error) {
		die("连接失败:".$conn->connect_error);
	}

	$i = $_POST['id'];
	$x = $_POST['x'];

	//验证发送过来的id，取出表中对应数据，如果没有则+1，存入；如果有+1，更新；
	//判断是点赞请求，还是刷新页面时显示数据请求；
	if ($x != 'false') {
		$result = mysqli_query($conn, "SELECT * FROM dianzan WHERE idname = '$i'");
		if ($row = mysqli_fetch_array($result)) {
			$num = $row['idvalue']+1;
			mysqli_query($conn,"UPDATE dianzan SET idvalue=$num WHERE idname='$i'");
			echo $num;
		} else {
			$ins ="INSERT INTO dianzan (idname, idvalue) VALUES ('$i', 1)";
			if ($conn->query($ins)) {
				echo 1;
			} 
		}
	} else {
		$result = mysqli_query($conn, "SELECT * FROM dianzan WHERE idname = '$i'");
		if ($row = mysqli_fetch_array($result)) {
			echo $row['idvalue'];
		} else {
			echo 0;
		}
	}

	$conn->close();
?>