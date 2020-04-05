function Covid19() {
	var $form = $("form#filters-form");
	var $country = $("select#country");

	/*
	var obj_countrylist = {};
	$country.children("option").each(function(index, el){
		obj_countrylist[$(el).val()] = $(el).text();
	});
	*/

	function updateChart(data) {
		console.log("done: " + JSON.stringify(data));
	}

	function fetchData() {
		var country = $country.val();

		$.ajax({
			url: document.location.origin + "/" + "get-chart-data",
			type: "GET",
			data: {"country": country},
			dataType: "json",
			contentType: "application/x-www-form-urlencoded;",
			cache: false,
			crossDomain: false,
			beforeSend: function (jqXHR) {
				jqXHR.overrideMimeType("application/x-www-form-urlencoded;");

				$("body").css({"cursor": "wait"});
			}
		})
		.done(function (result) {
			if (result.root && typeof result.root.exit_status != "undefined"){
				if(result.root.exit_status != 0){
					alert(result.root.message);
					return false;
				}

				updateChart(result.root.data);
			}
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			if (jqXHR.statusText !== "abort") {
				alert( "Request failed: " + textStatus + ", " + errorThrown);
			}
		})
		.always(function (jqXHR) {
			$("body").css({"cursor": ""});
		});
	}

	$country.change(fetchData);

	$form.submit(function () {
		return false;
	});

	/*
	$("form").submit(function() {
		$("#btnData").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
	});
	*/
}

$(document).ready(function (e) {
	Covid19();
});
