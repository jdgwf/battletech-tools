<?php
include("_bootstrap.php");

$request = $dbh->prepare("select * from `books` where `id` = '" . addslashes($_GET["id"]) . "'");
$request->execute();
$current = $request->fetch( PDO::FETCH_ASSOC );

	if(!empty($_POST["name"])) {
		$update_sql = "UPDATE `books` SET \n";
		$update_sql .= "`name` = '" . addslashes($_POST["name"]) . "',\n";
		$update_sql .= "`short_name` = '" . addslashes($_POST["short_name"]) . "',\n";
		$update_sql .= "`abbrev` = '" . addslashes($_POST["abbrev"]) . "',\n";
		$update_sql .= "`publisher` = '" . addslashes($_POST["publisher"]) . "',\n";
		$update_sql .= "`year` = '" . addslashes($_POST["year"]) . "',\n";
		$update_sql .= "`copyright` = '" . addslashes($_POST["copyright"]) . "',\n";
		$update_sql .= "`buyme` = '" . addslashes($_POST["buyme"]) . "'\n";
		$update_sql .= "WHERE `id` = '" . $current["id"] . "'\n";

		$update_obj = $dbh->prepare( $update_sql );
		if( $update_obj->execute() ) {
			$_SESSION["success"] = "Book saved successfully.";
			header("Location: books.php");
			exit();
		} else {
			$_SESSION["alert"] = "Error updating database!!";
		}
	}
$current_page = "books";
include("inc_header.php");
?>
<div class="column small-12 medium-9 large-10">
	<form action="" method="post">
	<div class="float-right">
		<a href="books.php" class="button warning">Cancel</a>
		<button class="button success">Save</button>
	</div>
	<h2>Adding Book</h2>

	<label>Book Name:
		<input type="text" name="name" value="<?php echo htmlentities($current["name"]); ?>" />
	</label>

	<label>Short Name:
		<input type="text" name="short_name" value="<?php echo htmlentities($current["short_name"]); ?>" />
	</label>

	<label>Abbreviation:
		<input type="text" name="abbrev" value="<?php echo htmlentities($current["abbrev"]); ?>" />
	</label>

	<label>Publisher:
		<input type="text" name="publisher" value="<?php echo htmlentities($current["publisher"]); ?>" />
	</label>

	<label>Year:
		<input type="text" name="year" value="<?php echo htmlentities($current["year"]); ?>" />
	</label>

	<label>Copyright:
		<input type="text" name="copyright" value="<?php echo htmlentities($current["copyright"]); ?>" />
	</label>

	<label>Purchase URL:
		<input type="text" name="buyme" value="<?php echo htmlentities($current["buyme"]); ?>" />
	</label>

	</form>
</div>
<?php include("inc_footer.php"); ?>