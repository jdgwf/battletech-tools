<?php
include("_bootstrap.php");

$request = $dbh->prepare("select * from `books` where `id` = '" . addslashes($_GET["id"]) . "'");
$request->execute();
$current = $request->fetch( PDO::FETCH_ASSOC );

$request2 = $dbh->prepare("select * from `books` where `id` = '" . addslashes($current["translation_of"]) . "'");
$request2->execute();
$parent = $request2->fetch( PDO::FETCH_ASSOC );

if( !empty($_POST["id"]) && !empty($_POST["lang"]) ) {
	$update = "UPDATE `books` SET ";
	$update .= " `name` = '" . addslashes($_POST["name"]) . "', ";
	$update .= " `publisher` = '" . addslashes($_POST["publisher"]) . "', ";
	$update .= " `lang` = '" . addslashes($_POST["lang"]) . "', ";
	$update .= " `copyright` = '" . addslashes($_POST["copyright"]) . "' ";
	$update .= " where `id` = '" . addslashes($current["id"]) . "' ";

	$update_obj = $dbh->prepare( $update );
	if( $update_obj->execute() ) {
		$_SESSION["success"] = "Translation updated successfully.";
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
	<input type="hidden" value="<?php echo $current["id"]; ?>" name="id" />
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
				if( $key == $current["lang"])
					print "<option selected=\"selected\" value=\"$key\">$name</option>\n";
				else
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
				<input type="text" name="name" value="<?php echo htmlentities($current["name"]); ?>" />
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
				<input type="text" name="publisher" value="<?php echo htmlentities($current["publisher"]); ?>" />
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
				<input type="text" name="copyright" value="<?php echo htmlentities($current["copyright"]); ?>" />
			</label>
		</div>
	</div>

	</form>
</div>
<?php include("inc_footer.php"); ?>