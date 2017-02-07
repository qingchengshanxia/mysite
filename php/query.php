<?php
	$conn = new mysqli("localhost","qingchengshanxia","1989long","qingchengshanxia");
	if (!$conn) {
		echo "Error:".$conn->connect_error;
	}
	$conn->query("SET character_set_connection=utf8, character_set_results=utf8, character_set_client=binary");

	$data = "SELECT id, name, email, txt, reg_date FROM chat";
	$result = $conn->query($data);
	echo "<div class='liuyan'>";
	if ($result->num_rows>0) {
		$i=0;
		while ($rows = $result->fetch_assoc()) {
			$i++;
			echo '<div class="louceng"><p><span class="left com-name">'.$rows['name'].'</span><span class="left"> 说：</span><span class="right">'.$i.' 楼</span></p><p class="comment"><span>'.$rows['txt'].'</span></p><p class="com-time">发表于'.$rows['reg_date'].' <a href="javascript:void(0)" class="com-message">回复(0)</a></p></div>';
		}
	} else {
		echo '亲，还没有留言!';
	}
	echo "</div>";
	$conn->close();
?>