<?php
include("_bootstrap.php");

	if(!empty($_POST["name"])) {
		$insert_sql = "INSERT INTO `books` (\n";
		$insert_sql .= "`name`,\n";
		$insert_sql .= "`short_name`,\n";
		$insert_sql .= "`abbrev`,\n";
		$insert_sql .= "`publisher`,\n";
		$insert_sql .= "`year`,\n";
		$insert_sql .= "`copyright`,\n";
		$insert_sql .= "`buyme`\n";
		$insert_sql .= " ) VALUES ( \n";
		$insert_sql .= "'" . addslashes($_POST["name"]) . "',\n";
		$insert_sql .= "'" . addslashes($_POST["short_name"]) . "',\n";
		$insert_sql .= "'" . addslashes($_POST["abbrev"]) . "',\n";
		$insert_sql .= "'" . addslashes($_POST["publisher"]) . "',\n";
		$insert_sql .= "'" . addslashes($_POST["year"]) . "',\n";
		$insert_sql .= "'" . addslashes($_POST["copyright"]) . "',\n";
		$insert_sql .= "'" . addslashes($_POST["buyme"]) . "'\n";
		$insert_sql .= " );\n";

		$insert_obj = $dbh->prepare( $insert_sql );
		if( $insert_obj->execute() ) {
			$_SESSION["success"] = "Book added successfully.";
			header("Location: books.php");
			exit();
		} else {
			$_SESSION["alert"] = "Error inserting into database!!";
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
		<input type="text" name="name" />
	</label>

	<label>Short Name:
		<input type="text" name="short_name" />
	</label>

	<label>Abbreviation:
		<input type="text" name="abbrev" />
	</label>

	<label>Publisher:
		<input type="text" name="publisher" value="Pinnacle Entertainment Group" />
	</label>

	<label>Year:
		<input type="text" name="year" />
	</label>

	<label>Copyright:
		<input type="text" name="copyright" />
	</label>

	<label>Purchase URL:
		<input type="text" name="buyme" />
	</label>

	</form>
</div>
<?php include("inc_footer.php"); ?>