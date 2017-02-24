/* Functions outside scope for SVG manipulation */
function ASChangeSVGHeat( newHeatValue, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.setMechHeat( newHeatValue, groupIndex, mechIndex ) ;
		}
    );
}


function ASToggleArmorPip( armorIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleArmorPip( armorIndex, groupIndex, mechIndex ) ;
		}
    );
}


function ASToggleStructPip( structIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleStructPip( structIndex, groupIndex, mechIndex ) ;
		}
    );
}


function ASToggleEngineHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleEngineHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleFireControlHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleControlHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleMPlHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleMPHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleWeaponHits( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleWeaponHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASTakeDamage(  groupIndex, mechIndex, idField ) {
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.showDamagePopup( groupIndex, mechIndex ) ;
		}
    );
}
