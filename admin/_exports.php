<?php

function export_books_javascript( $export_file ) {
	global $dbh;

	$sth = $dbh->prepare("SELECT * FROM `books` where `translation_of` = '0'");
	$sth->execute();

	$export_js = '/*

Data here is NOT Licensed under the Creative Commons and is owned by Pinnacle Entertainment Group.

This product references the Savage Worlds game system, available from Pinnacle Entertainment Group at www.peginc.com.
Savage Worlds and all associated logos and trademarks are copyrights of Pinnacle Entertainment Group. Used with permission.
Pinnacle makes no representation or warranty as to the quality, viability, or suitability for purpose of this product.

The entries in this file are from Savage Worlds Role Playing Game and are owned by Pinnacle Entertainment Group.
*/

var global_books_list = Array();
';

	$count = 0;
	while( $row = $sth->fetch(PDO::FETCH_ASSOC) ) {
		$sth_trans = $dbh->prepare("SELECT * FROM `books` where `translation_of` = '" . $row["id"] . "'");
		$sth_trans->execute();
		$translations = $sth_trans->fetchAll(PDO::FETCH_ASSOC);

		$export_js .= '
global_books_list[' . $count . '] = {
	id: 1,
	core: true,
	name: {
';
$export_js .= "\t\t\"en-US\": \"" . $row["name"] . "\",\n";
for($trancount = 0; $trancount < count($translations); $trancount++) {
	$export_js .= "\t\t\"" . $translations[$trancount]["lang"] . "\": \"" . $translations[$trancount]["name"] . "\",\n";
}
		$export_js .= '	},
	short_name: "' . $row["short_name"] . '",
	abbrev: "' . $row["abbrev"] . '",
	publisher: {
';
$export_js .= "\t\t\"en-US\": \"" . $row["publisher"] . "\",\n";
for($trancount = 0; $trancount < count($translations); $trancount++) {
	$export_js .= "\t\t\"" . $translations[$trancount]["lang"] . "\": \"" . $translations[$trancount]["publisher"] . "\",\n";
}
		$export_js .= '
	},
	year: "' . $row["year"] . '",
	copyright: {
';
$export_js .= "\t\t\"en-US\": \"" . $row["copyright"] . "\",\n";
for($trancount = 0; $trancount < count($translations); $trancount++) {
	$export_js .= "\t\t\"" . $translations[$trancount]["lang"] . "\": \"" . $translations[$trancount]["copyright"] . "\",\n";
}
$export_js .= '
	},
	buyme: "' . $row["buyme"] . '"
}
';
		$count++;
	}


	return file_put_contents($export_file, $export_js);
}

function export_extras_javascripts($export_directory) {
	global $dbh;
	$return_string = "";

	$sth = $dbh->prepare("SELECT * FROM `extras` where `translation_of` = '0' order by `book` asc, `name` asc");
	$sth->execute();

	$last_book = -1; // automatically have it look up the first book..

	while( $extra_row = $sth->fetch(PDO::FETCH_ASSOC)) {
		if( $last_book != $extra_row["book"]) {
			$sth_book = $dbh->prepare("SELECT * FROM `books` where `id` = '" . $extra_row["book"] . "'");
			$sth_book->execute();
			$book = $sth_book->fetch(PDO::FETCH_ASSOC);

			$export_js = '/*

Data here is NOT Licensed under the Creative Commons and is owned by Pinnacle Entertainment Group.

This product references the Savage Worlds game system, available from Pinnacle Entertainment Group at www.peginc.com.
Savage Worlds and all associated logos and trademarks are copyrights of Pinnacle Entertainment Group. Used with permission.
Pinnacle makes no representation or warranty as to the quality, viability, or suitability for purpose of this product.

The entries in this file are from Savage Worlds Role Playing Game and are owned by Pinnacle Entertainment Group.
*/

if(typeof(global_extra_database) == "undefined")
	var global_extra_database = Array();

if(typeof(global_extra_books) == "undefined")
	var global_extra_books = Array();

var current_book = get_book_by_id(' . $extra_row["book"] . ');

global_extra_books = global_extra_books.concat(current_book);

';
			// TODO - do each entry, should be very simple once the data is in.

			if( file_put_contents($export_directory . "extras_" . $book["short_name"] . ".js", $export_js) ) {
				$return_string .= "<li>Extras Datafile for book '" . $book["name"] . "' has been exported to " . $export_directory . "extras_" . $book["short_name"] . ".js" . "</li>";
			} else {
				$return_string .= "<li>Could not write to " . $export_directory . "extras_" . $book["short_name"] . ".js" . "</li>";
			}

		}

	}
	return $return_string;
}