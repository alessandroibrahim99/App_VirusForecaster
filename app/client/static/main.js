
function Covid19() {
	var $form = $("form#filters-form");
	var $country = $("select#country");

	/*
	var obj_countrylist = {};
	$country.children("option").each(function(index, el){
		obj_countrylist[$(el).val()] = $(el).text();
	});
	*/

	/*$("#data-plot").append(
		$("<canvas>").attr({width: 200, height:500})
	);
	*/

	function updateChart(data) {
		console.log("done: " + JSON.stringify(data));

		$("#img-data-plot").attr("src", data.img);

		/*
		var d3 = require("d3");
		var jsdom = require("jsdom");

		var document = jsdom.jsdom();
		*/
		//var canvas = d3.select($("#data-plot")[0]).append("canvas");
		//var svg = d3.select($("#data-plot")[0]).append("svg");
		//var svg = d3.select(document.body).append("svg");

		/*
		var data = [80, 120, 60, 150, 200];
		var barHeight = 20;
		var bar = d3.select('canvas').selectAll('rect').data(data).enter().append('rect')
			.attr('width', function(d) {return d; })
			.attr('height', barHeight - 1)
			.attr('transform', function(d, i) { return "translate(0," + i * barHeight + ")"; });
		*/

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
