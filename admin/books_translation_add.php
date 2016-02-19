<?php
include("_bootstrap.php");

$request = $dbh->prepare("select * from `books` where `id` = '" . addslashes($_GET["parent"]) . "'");
$request->execute();
$parent = $request->fetch( PDO::FETCH_ASSOC );

if( !empty($_POST["translation_of"]) && !empty($_POST["lang"]) ) {
	$insert = "INSERT INTO `books` (";
	$insert .= "`lang`,";
	$insert .= "`name`,";
	$insert .= "`translation_of`,";
	$insert .= "`publisher`,";
	$insert .= "`copyright`";
	$insert .= " ) VALUES ( ";
	$insert .= " '" . addslashes($_POST["lang"]) . "',";
	$insert .= " '" . addslashes($_POST["name"]) . "',";
	$insert .= " '" . addslashes($_POST["translation_of"]) . "',";
	$insert .= " '" . addslashes($_POST["publisher"]) . "',";
	$insert .= " '" . addslashes($_POST["copyright"]) . "'";
	$insert .= " )  ";
	$insert_obj = $dbh->prepare( $insert );
	if( $insert_obj->execute() ) {
		$_SESSION["success"] = "Translation added successfully.";
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
	<input type="hidden" value="<?php echo $parent["id"]; ?>" name="translation_of" />
	<div class="float-right">
		<a href="books.php" class="button warning">Cancel</a>
		<button class="button success">Save</button>
	</div>
	<h2>Adding Translation Text</h2>
	<div class="row">
		<div class="column small-6">
			English
		</div>
		<div class="column small-6">
			<label>Translation to:
				<select name="lang">
		<?php
			foreach($supported_languages as $lang) {
				$key = $lang["short_code"];
				$name = $lang["english_name"];
				print "<option value=\"$key\">$name</option>\n";
			}
		?>
				</select>
			</label>
		</div>
	</div>

	<div class="row">
		<div class="column small-6">
			<label>
				<?php echo htmlentities($parent["name"]); ?>

			</label>
		</div>
		<div class="column small-6">
			<label>
				<input type="text" name="name" value="" />
			</label>
		</div>
	</div>

	<div class="row">
		<div class="column small-6">
			<label>
				<?php echo htmlentities($parent["publisher"]); ?>

			</label>
		</div>
		<div class="column small-6">
			<label>
				<input type="text" name="publisher" value="" />
			</label>
		</div>
	</div>

	<div class="row">
		<div class="column small-6">
			<label>
				<?php echo htmlentities($parent["copyright"]); ?>

			</label>
		</div>
		<div class="column small-6">
			<label>
				<input type="text" name="copyright" value="" />
			</label>
		</div>
	</div>

	</form>
</div>
<?php include("inc_footer.php"); ?>