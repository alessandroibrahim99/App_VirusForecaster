function Covid19() {
	var $form = $("form#filters-form");
	$form.submit(function () { return false; });

	var $country = $("select#country");

	var _option_list = [];
	$country.children("option").each(function (index, el) {
		_option_list.push([$(el).val(), $(el).text()]);
	});

	var default_country = window.getDefaultCountryWrapper(_option_list);
	$country.val(default_country);

	function updateChart(data) {
		/*
		alert(data.country);
		console.log("done: " + JSON.stringify(data));
		$("#data-plot").append(JSON.stringify(data));
		*/

		$("#total_cases_today").text(data.total_cases_until_today);
		$("#total_cases_30days").text(data.total_cases_in_30days);
		$("#day_of_peak").text(data.peak.day);
		$("#active_cases_today").text(data.active_cases_today);
		$("#active_cases_30days").text(data.active_cases_in_30days);

		/*
		"Total confirmed cases at today:" +
		data.total_cases_until_today

		//5.6% than estimated 7days ago ? where from

		"Estimated cases in 30days"+
		data.total_cases_in_30days
		//-3.7% than estimated 7days ago ? where from

		"Estimated days to peak:" +
		data.peak.day
		//-6days than estimated 7days ago ? where from
		*/

		window.makeChartist(data);
	}

	function fetchData() {
		var country = $country.val();

		$.ajax({
			url: document.location.origin + "/" + "get-chart-data",
			type: "GET",
			data: { country: country },
			dataType: "json",
			contentType: "application/x-www-form-urlencoded;",
			cache: false,
			crossDomain: false,
			beforeSend: function (jqXHR) {
				jqXHR.overrideMimeType("application/x-www-form-urlencoded;");

				$("body").css({ cursor: "wait" });
			},
		})
			.done(function (result) {
				if (
					result.root &&
					typeof result.root.exit_status != "undefined"
				) {
					if (result.root.exit_status != 0) {
						alert(result.root.message);
						return false;
					}

					updateChart(result.root.data);
				}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				if (jqXHR.statusText !== "abort") {
					alert("Request failed: " + textStatus + ", " + errorThrown);
				}
			})
			.always(function (jqXHR) {
				$("body").css({ cursor: "" });
			});
	}

	$country.change(fetchData).change();
}

$(document).ready(function (e) {
	$(".navbar-nav li a").on("click", function () {
		$(this).addClass("active");
		setTimeout(function () {
			$(".navbar-nav li a").removeClass("active");
		}, 1000);
	});

	Covid19();
});
