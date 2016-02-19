<?php

define('DB_NAME', 'jdgwf_swwt2');

/** MySQL database username */
define('DB_USER', 'jdgwf');

/** MySQL database password */
define('DB_PASSWORD', 'B77PYNEUFZR5PN3B');

/** MySQL hostname */
define('DB_HOST', 'localhost');

$dbh = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);

//$result = $sth->fetch(PDO::FETCH_ASSOC);