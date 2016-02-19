<?php
include("_bootstrap.php");

$current_page = "books";
include("inc_header.php");
?>
<div class="column small-12 medium-9 large-10">
	<a href="books_add.php" class="button float-right">Add Book</a>
	<h2>Books</h2>
	<table>
		<tr>
			<th>Book Name</th>
			<th>Edit Translations</th>
		</tr>
<?php
$sth = $dbh->prepare("SELECT `name`,`id`,`lang` FROM `books` where `translation_of` = '0'");
$sth->execute();

while( $row = $sth->fetch(PDO::FETCH_ASSOC) ) {


	print "<tr>";
	print "<td>";
	print "";
	print $row["name"];
	print "</td>";
	print "<td>";
	$sth_trans = $dbh->prepare("SELECT `name`,`id`,`lang` FROM `books` where `translation_of` = '" . $row["id"] . "' order by `lang` asc");
	$sth_trans->execute();

	print "<a href=\"books_edit.php?id=" . $row["id"] . "\"><img width=\"25px\" src=\"/images/flags/64/US.png\" title=\"en-US\" /></a>";
	while( $trans_row = $sth_trans->fetch(PDO::FETCH_ASSOC) ) {
		print " <a href=\"books_translation_edit.php?id=" . $trans_row["id"] . "\"><img width=\"25px\" src=\"/images/flags/64/" . $flag_icon[$trans_row["lang"]] . "\" title=\"" . $trans_row["lang"] . "\" /></a>";
	}
	print "<a href=\"books_translation_add.php?parent=" . $row["id"] . "\" class=\"button tiny secondary float-right\">Add New</a>";
	print "</td>";
	print "</tr>";
}
?>
	</table>

</div>
<?php include("inc_footer.php"); ?>