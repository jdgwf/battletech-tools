<!doctype html>
<html ng-app="baseApp" class="no-js ng-scope" lang="en-US">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title ng-bind="title_tag">Savage Worlds Web Tools</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="apple-touch-icon" href="apple-touch-icon.png">
		<!-- Place favicon.ico in the root directory -->

		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.1.2/foundation.min.css">
		<link rel="stylesheet" href="/css/style.min.css">
		<style>
			table tr td,
			table tr th {
				color: black;
			}
			label {
				color: #fff;
			}
		</style>
	</head>
	<body>
		<header>
			<div class="row">
				<div class="column small-12 medium-12">

					<h1><a href="#/" translate="APP_TITLE">Savage Worlds Web Tools</a></h1>
					<h2 ng-bind="subtitle_tag">Data Admin</h2>
				</div>
			</div>
		</header>
<?php
if(!empty($_SESSION["message"])) {
	print '<div class="row"><div class="column small-12"><div class="callout primary small radius">' . $_SESSION["message"] . '</div></div></div>';
	$_SESSION["message"] = "";
}
if(!empty($_SESSION["success"])) {
	print '<div class="row"><div class="column small-12"><div class="callout success small radius">' . $_SESSION["success"] . '</div></div></div>';
	$_SESSION["success"] = "";
}
if(!empty($_SESSION["alert"])) {
	print '<div class="row"><div class="column small-12"><div class="callout alert small radius">' . $_SESSION["alert"] . '</div></div></div>';
	$_SESSION["alert"] = "";
}
if(!empty($_SESSION["warning"])) {
	print '<div class="row"><div class="column small-12"><div class="callout warning small radius">' . $_SESSION["warning"] . '</div></div></div>';
	$_SESSION["warning"] = "";
}
?>
			<div class="row">
<div class="column small-12 medium-3 large-2">
	<a class="button expanded <?php if($current_page == "home"){ echo "primary";}else{echo "secondary";} ?>" href="./">Home</a>
	<a class="button expanded <?php if($current_page == "books"){ echo "primary";}else{echo "secondary";} ?>" href="./books.php">Books</a>
	<a class="button expanded <?php if($current_page == "translations"){ echo "primary";}else{echo "secondary";} ?>" href="./translations.php">Translations</a>
	<a class="button expanded <?php if($current_page == "extras"){ echo "primary";}else{echo "secondary";} ?>" href="./extras.php">Extras</a>
	<a class="button expanded <?php if($current_page == "export"){ echo "primary";}else{echo "secondary";} ?>" href="./export.php">Export</a>
</div>