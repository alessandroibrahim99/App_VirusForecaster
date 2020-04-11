
function getCountry(_locale){
	var arr = [
		["AF","Afghanistan"],
		["AL","Albania"],
		["DZ","Algeria"],
		["AD","Andorra"],
		["AO","Angola"],
		["AG","Antigua & Barbuda"],
		["AR","Argentina"],
		["AM","Armenia"],
		["AU","Australia"],
		["AT","Austria"],
		["AZ","Azerbaijan"],
		["BS","Bahamas"],
		["BH","Bahrain"],
		["BD","Bangladesh"],
		["BB","Barbados"],
		["BY","Belarus"],
		["BE","Belgium"],
		["BZ","Belize"],
		["BJ","Benin"],
		["BT","Bhutan"],
		["BO","Bolivia"],
		["BA","Bosnia & Herzegovina"],
		["BW","Botswana"],
		["BR","Brazil"],
		["BN","Brunei"],
		["BG","Bulgaria"],
		["BF","Burkina Faso"],
		["BI","Burundi"],
		["KH","Cambodia"],
		["CM","Cameroon"],
		["CA","Canada"],
		["CV","Cape Verde"],
		["CF","Central African Republic"],
		["TD","Chad"],
		["CL","Chile"],
		["CN","China"],
		["CO","Colombia"],
		["KM","Comoros"],
		["CG","Congo - Brazzaville"],
		["CD","Congo - Kinshasa"],
		["CR","Costa Rica"],
		["CI","Côte d’Ivoire"],
		["HR","Croatia"],
		["CU","Cuba"],
		["CY","Cyprus"],
		["CZ","Czechia"],
		["DK","Denmark"],
		["DJ","Djibouti"],
		["DM","Dominica"],
		["DO","Dominican Republic"],
		["EC","Ecuador"],
		["EG","Egypt"],
		["SV","El Salvador"],
		["GQ","Equatorial Guinea"],
		["ER","Eritrea"],
		["EE","Estonia"],
		["SZ","Eswatini"],
		["ET","Ethiopia"],
		["FJ","Fiji"],
		["FI","Finland"],
		["FR","France"],
		["GA","Gabon"],
		["GM","Gambia"],
		["GE","Georgia"],
		["DE","Germany"],
		["GH","Ghana"],
		["GR","Greece"],
		["GD","Grenada"],
		["GT","Guatemala"],
		["GN","Guinea"],
		["GW","Guinea-Bissau"],
		["GY","Guyana"],
		["HT","Haiti"],
		["HN","Honduras"],
		["HU","Hungary"],
		["IS","Iceland"],
		["IN","India"],
		["ID","Indonesia"],
		["IR","Iran"],
		["IQ","Iraq"],
		["IE","Ireland"],
		["IL","Israel"],
		["IT","Italy"],
		["JM","Jamaica"],
		["JP","Japan"],
		["JO","Jordan"],
		["KZ","Kazakhstan"],
		["KE","Kenya"],
		["KI","Kiribati"],
		["KW","Kuwait"],
		["KG","Kyrgyzstan"],
		["LA","Laos"],
		["LV","Latvia"],
		["LB","Lebanon"],
		["LS","Lesotho"],
		["LR","Liberia"],
		["LY","Libya"],
		["LI","Liechtenstein"],
		["LT","Lithuania"],
		["LU","Luxembourg"],
		["MG","Madagascar"],
		["MW","Malawi"],
		["MY","Malaysia"],
		["MV","Maldives"],
		["ML","Mali"],
		["MT","Malta"],
		["MH","Marshall Islands"],
		["MR","Mauritania"],
		["MU","Mauritius"],
		["MX","Mexico"],
		["FM","Micronesia"],
		["MD","Moldova"],
		["MC","Monaco"],
		["MN","Mongolia"],
		["ME","Montenegro"],
		["MA","Morocco"],
		["MZ","Mozambique"],
		["MM","Myanmar (Burma)"],
		["NA","Namibia"],
		["NR","Nauru"],
		["NP","Nepal"],
		["NL","Netherlands"],
		["NZ","New Zealand"],
		["NI","Nicaragua"],
		["NE","Niger"],
		["NG","Nigeria"],
		["KP","North Korea"],
		["MK","North Macedonia"],
		["NO","Norway"],
		["OM","Oman"],
		["PK","Pakistan"],
		["PW","Palau"],
		["PA","Panama"],
		["PG","Papua New Guinea"],
		["PY","Paraguay"],
		["PE","Peru"],
		["PH","Philippines"],
		["PL","Poland"],
		["PT","Portugal"],
		["QA","Qatar"],
		["RO","Romania"],
		["RU","Russia"],
		["RW","Rwanda"],
		["WS","Samoa"],
		["SM","San Marino"],
		["ST","São Tomé & Príncipe"],
		["SA","Saudi Arabia"],
		["SN","Senegal"],
		["RS","Serbia"],
		["SC","Seychelles"],
		["SL","Sierra Leone"],
		["SG","Singapore"],
		["SK","Slovakia"],
		["SI","Slovenia"],
		["SB","Solomon Islands"],
		["SO","Somalia"],
		["ZA","South Africa"],
		["KR","South Korea"],
		["SS","South Sudan"],
		["ES","Spain"],
		["LK","Sri Lanka"],
		["KN","St. Kitts & Nevis"],
		["LC","St. Lucia"],
		["VC","St. Vincent & Grenadines"],
		["SD","Sudan"],
		["SR","Suriname"],
		["SE","Sweden"],
		["CH","Switzerland"],
		["SY","Syria"],
		["TJ","Tajikistan"],
		["TZ","Tanzania"],
		["TH","Thailand"],
		["TL","Timor-Leste"],
		["TG","Togo"],
		["TO","Tonga"],
		["TT","Trinidad & Tobago"],
		["TN","Tunisia"],
		["TR","Turkey"],
		["TM","Turkmenistan"],
		["TV","Tuvalu"],
		["UG","Uganda"],
		["UA","Ukraine"],
		["AE","United Arab Emirates"],
		["GB","United Kingdom"],
		["US","United States"],
		["UY","Uruguay"],
		["UZ","Uzbekistan"],
		["VU","Vanuatu"],
		["VE","Venezuela"],
		["VN","Vietnam"],
		["YE","Yemen"],
		["ZM","Zambia"],
		["ZW","Zimbabwe"],
	];

	_locale = _locale.toLowerCase();

	var index = arr.findIndex(function(elem){
		return elem[0].toLowerCase() === _locale;
	});

	if(index != -1){
		return arr[index][1];
	}

	return "";
}

function Covid19() {
	var $form = $("form#filters-form");
	var $country = $("select#country");

	/*
	const plugin_axistitle = require("chartist-plugin-axistitle");
	plugin_axistitle();

	const plugin_tooltip = require("chartist-plugin-tooltip");
	plugin_tooltip();
	*/

	/*
	var obj_countrylist = {};
	$country.children("option").each(function(index, el){
		obj_countrylist[$(el).val()] = $(el).text();
	});
	*/

	var arr_countrylist = [];
	$country.children("option").each(function(index, el){
		arr_countrylist.push([$(el).val(), $(el).text()]);
	});

	var default_country;

	try {
		var tmp = Intl.DateTimeFormat().resolvedOptions();
		var locale = tmp.locale;

		default_country = getCountry(tmp.locale);

		var index = arr_countrylist.findIndex(function(elem){
			return elem[0].toLowerCase() === default_country.toLowerCase();
		});

		if(index == -1){
			default_country = "World";
		}
	}
	catch (err) {
		default_country = "World";
	}

	$country.val(default_country);

	/*
	$("#data-plot").append(
		$("<canvas>").attr({width: 200, height:500})
	);
	*/

	function updateChart(data) {
		/*
		alert(data.country);
		console.log("done: " + JSON.stringify(data));
		$("#data-plot").append(JSON.stringify(data));
		*/

		$("#data-plot").empty().append(
			$("<div>").addClass("ct-chart ct-major-eleventh")
		);

		var labels_days = [];
		var series_forecast = [];
		var series_deaths = [];

		for(var i = 0; i < data.days.length; i++){
			labels_days.push(data.days[i].day);
			series_forecast.push(data.days[i].data.forecast);
			series_deaths.push(data.days[i].data.deaths);
		}

		var chartData = {
			labels: labels_days,
			series: [{
				name: "forecast-series",
				data: series_forecast
			},{
				name: "deaths-series",
				data: series_deaths
			}]
		};
		var chartOptions = {
			fullWidth: true,
			series: {
				'forecast-series': {
					lineSmooth: Chartist.Interpolation.simple(),
					showPoint: false,
					showArea: true
				},
				'deaths-series': {
					lineSmooth: Chartist.Interpolation.simple(),
					showPoint: false,
					showArea: true
				}/*
				,
				'series-3': {
					showPoint: false
				}*/
			},
			axisX: {
				// We can disable the grid for this axis
				showGrid: false,
				// and also don't show the label
				/*showLabel: false*/
			}
			/*
			chartPadding: {
			  right: 40
			}*/
		};

		var DSIChart = new Chartist.Line('.ct-chart', chartData, chartOptions);

		/*
		var chart = new Chartist.Line('.ct-chart', {
			labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
			// Naming the series with the series object array notation
			series: [{
				name: 'series-1',
				data: [5, 2, -4, 2, 0, -2, 5, -3]
			}, {
				name: 'series-2',
				data: [4, 3, 5, 3, 1, 3, 6, 4]
			}, {
				name: 'series-3',
				data: [2, 4, 3, 1, 4, 5, 3, 2]
			}]
		}, {
			fullWidth: true,
			// Within the series options you can use the series names
			// to specify configuration that will only be used for the
			// specific series.
			series: {
				'series-1': {
				lineSmooth: Chartist.Interpolation.step()
				},
				'series-2': {
				lineSmooth: Chartist.Interpolation.simple(),
				showArea: true
				},
				'series-3': {
				showPoint: false
				}
			}
		}, [
			// You can even use responsive configuration overrides to
			// customize your series configuration even further!
			['screen and (max-width: 320px)', {
				series: {
				'series-1': {
					lineSmooth: Chartist.Interpolation.none()
				},
				'series-2': {
					lineSmooth: Chartist.Interpolation.none(),
					showArea: false
				},
				'series-3': {
					lineSmooth: Chartist.Interpolation.none(),
					showPoint: true
				}
				}
			}]
		]);
		*/

		/*
		new Chartist.Line('.ct-chart', {
			labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			series: [
			  [12, 9, 7, 8, 5],
			  [2, 1, 3.5, 7, 3],
			  [1, 3, 4, 5, 6]
			]
		  }, {
			fullWidth: true,
			chartPadding: {
			  right: 40
			}
		  });
		  */


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

		/*
		days: [{}]
		"total_cases_until_today": 1426096.0,
		"total_cases_in_30days": 9013463.847606385,
		"active_cases_today": 101488.0,
		"active_cases_in_30days": 316402.4731952492,
		"peak": {"day": "30/04/2020", "data": 316402.4731952492},
		"country": "World"
		*/

		/*$("#img-data-plot").attr("src", data.img);*/

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
	$(".navbar-nav li a").on("click", function () {
		$(this).addClass("active");
		setTimeout(function () {
			$(".navbar-nav li a").removeClass("active");
		}, 1000);
	});

	Covid19();
});
