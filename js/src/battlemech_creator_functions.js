

function update_mech_status_bar_and_tro($scope, $translate, current_mech) {
	$translate(
		[
			'BM_REMAINING_TONS', 'BM_UNALLOCATED_ARMOR'
		]
	).then(function (translation) {
		$scope.mech_status_bar = "<strong>" + translation.BM_REMAINING_TONS + "</strong>: " + current_mech.getRemainingTonnage() + " | <strong>" + translation.BM_UNALLOCATED_ARMOR + "</strong>: " + current_mech.getUnallocatedArmor();

		$scope.mech_summary_html = current_mech.makeTROHTML();
	});

}