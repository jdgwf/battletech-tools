<?php

$supported_languages = Array(
	Array(
		"english_name" => "English",
		"native_name" => "English",
		"icon_file" => "US.png",
		"short_code" => "en-US",
		"active" => true
	),
	Array(
		"english_name" => "Brazillian",
		"native_name" => "Brasileiro",
		"icon_file" => "BR.png",
		"short_code" => "pt-BR",
		"active" => true
	),
	Array(
		"english_name" => "German",
		"native_name" => "Deutsch",
		"icon_file" => "DE.png",
		"short_code" => "de-DE",
		"active" => true
	)
);

$flag_icon = Array();
foreach($supported_languages as $lang) {
	$flag_icon[ $lang["short_code"] ] = $lang["icon_file"];
}

$rosetta = Array(

	"(head general)" => "General",
	"BUTTON_LANG_EN" => 'English',
	"BUTTON_LANG_DE" => 'German',
	"BUTTON_LANG_BR" => 'Brazilian',

	"APP_TITLE" => 'Savage Worlds Web Tools',

	"(head welcome)" => "Welcome Page",
	"INDEX_WELCOME" => 'Welcome',
	"INDEX_H3_CORE" => 'Savage Worlds Core Tools',
	"INDEX_H3_SCIFI" => 'Sci-Fi Companion Tools',
	"INDEX_BUTTON_CORE_DICE" => 'Flexible Dice Roller',
	"INDEX_BUTTON_CORE_RAISE" => 'Raise Calculator',
	"INDEX_BUTTON_CORE_EXTRAS" => 'Extras Database',
	"INDEX_BUTTON_CORE_CHAR" => 'Character Maker',
	"INDEX_BUTTON_CORE_MASSBATTLES" => 'Mass Battles',

	"INDEX_BUTTON_SCIFI_POWER" => 'Power Armor Maker',
	"INDEX_BUTTON_SCIFI_ROBOT" => 'Robot Maker',
	"INDEX_BUTTON_SCIFI_STARSHIP" => 'Starship Maker',
	"INDEX_BUTTON_SCIFI_VEHICLE" => 'Vehicle Maker',
	"INDEX_BUTTON_SCIFI_WALKER" => 'Walker Maker',
	"INDEX_BUTTON_SCIFI_WORLD" => 'World Maker',

	"(head dice roller)" => "Dice Roller",
	"DICE_TITLE_TAG" => "Flexible Dice Roller | Savage Worlds Web Tools",
	"DICE_H3_DICE" => "Dice",
	"DICE_H3_ROLL_TYPE" => "Roll Type",
	"DICE_H3_RESULTS" => "Results",
	"DICE_WILD_DIE" => "Throw a Wild Die too",
	"DICE_ROLL_DICE" => "Roll Results",
	"DICE_ROLL_TYPE" => "Roll Type",
	"DICE_ROLL_TYPE_ROLL" => "Just a roll of the dice...",
	"DICE_ROLL_TYPE_TRAIT" => "Trait Test",
	"DICE_ROLL_TYPE_DAMAGE" => "Damage Roll",
	"DICE_NO_DICE_THROWN" => "No dice have been thrown",
	"DICE_TOTAL_ROLL" => "Total Roll",
	"DICE_TARGET_NUMBER" => "Target Number",
	"DICE_BASE_TOUGHNESS" => "Base Toughness",
	"DICE_ARMOR" => "Armor",
	"DICE_WEAPON_AP" => "Weapon's AP",
	"DICE_TRAIT_OPTIONS" => "Trait Options",
	"DICE_DAMAGE_OPTIONS" => "Damage Options",
	"DICE_WILD_DIE_NOTE" => "Put a * after the d6, d8, etc to roll a wild die with that roll. Example: d4* - 2 for an untrained wild card skill check",

	"DICE_LABEL_NO_EFFECT" =>  "No Effect",
	"DICE_LABEL_SHAKEN" => "Shaken",
	"DICE_LABEL_SHAKEN_AND_A_WOUND" => "Shaken and a wound",
	"DICE_LABEL_SHAKEN_AND_X_WOUNDS" => "Shaken and {raises} wounds",

	"DICE_LABEL_CRITICAL_FAILURE" => "Critical Failure",
	"DICE_LABEL_FAILURE" => "Failure",
	"DICE_LABEL_SUCCESS" => "Success",
	"DICE_LABEL_SUCCESS_WITH_A_RAISE" => "Success with a raise",
	"DICE_LABEL_SUCCESS_WITH_X_RAISES" => "Success with {raises} raises",

	"DICE_LABEL_DIE_ROLL_NUMBER" => "die roll #",
	"DICE_LABEL_WILD_DIE_ROLL_NUMBER" => "wild die roll #",
	"DICE_ROLL_SET_NUM" => "Roll Set #",

	"(head raise calculator)" => "Raise Calculator",
	"RAISE_ROLL_VARS" => "Raise Specifics",
	"RAISE_ROLL_RESULTS" => "Results",
	"RAISE_ROLL" => "Roll",
	"RAISE_TARGET_NUMBER" => "Target Number/Base Toughness",
	"RAISE_ARMOR" => "Armor (ignored for trait results)",
	"RAISE_WEAPON_AP" => "Weapon's AP (ignored for trait results)",
	"RAISE_RESULT_DAMAGE" => "Damage Result",
	"RAISE_RESULT_TRAIT" => "Trait Result"



);