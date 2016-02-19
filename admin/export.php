<?php
include("_bootstrap.php");

$export_message = "";
$books_export_file = "../js/src/books_list.js";
$extras_directory = "../js/src/data/";

if(!empty($_GET["run_export"])) {
	$_SESSION["export_message"] = "";
	if( export_books_javascript( $books_export_file ) ) {
		$_SESSION["export_message"] .= "<li>The Books List file and data '$books_export_file' has been exported and saved.</li>";
	}


	$_SESSION["export_message"] .= export_extras_javascripts($extras_directory);


	$_SESSION["success"] = "Files have been exported";
	header("location: export.php");
	exit();
}
if(!empty($_SESSION["export_message"]) ) {
	$export_message = $_SESSION["export_message"];
	$_SESSION["export_message"] = "";
}

$current_page = "export";
include("inc_header.php");
?>
<div class="column small-12 medium-9 large-10">
	<h2>Export to Javascript Files</h2>
	<div class="text-center">
		<a href="export.php?run_export=1" class="button primary big">Run Exporters</a>
		<ul class="text-left"><?php echo $export_message; ?></ul>
	</div>
</div>

<?php include("inc_footer.php"); ?>