/*
import logMessage from './js/logger'
import './css/style.css'
// Log message to console
logMessage('A very warm welcome to Expack!')
// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef  
}
*/
import $ from "jquery";
import Chartist from "chartist";
/*
let plugin_axistitle = require("chartist-plugin-axistitle");
plugin_axistitle();
*/

const plugin_tooltip = require("chartist-plugin-tooltip");
plugin_tooltip();

const utilities = require("./js/utilities.js");

window.getDefaultCountryWrapper = function (arr_countrylist) {
	var default_country = utilities.getDefaultCountry(arr_countrylist);
	return default_country;
};

window.makeChartist = function (data) {
	/*
	alert(data.country);
	console.log("done: " + JSON.stringify(data));
	$("#data-plot").append(JSON.stringify(data));
	*/
	$("#data-plot").find(".ct-chart").remove();
	$("#data-plot").append($("<div>").addClass("ct-chart ct-major-eleventh"));

	var labels_days = [];
	var series_forecast = [];
	var series_deaths = [];

	for (var i = 0; i < data.days.length; i++) {
		labels_days.push(data.days[i].day);
		//series_forecast.push(data.days[i].data.forecast);

		series_forecast.push({
			meta: "description",
			value: data.days[i].data.forecast,
		});

		series_deaths.push(data.days[i].data.deaths);
	}

	var chartData = {
		labels: labels_days,
		series: [
			{
				name: "deaths-series",
				data: series_deaths,
			},
			{
				name: "forecast-series",
				data: series_forecast,
			},
		],
	};
	var chartOptions = {
		fullWidth: true,
		series: {
			"deaths-series": {
				lineSmooth: Chartist.Interpolation.simple(),
				showPoint: false,
				showArea: true,
			},
			"forecast-series": {
				lineSmooth: Chartist.Interpolation.simple(),
				showPoint: false,
				showArea: true,
			},
		},
		axisX: {
			// We can disable the grid for this axis
			showGrid: true,
			// and also don't show the label
			showLabel: false,
		},
		plugins: [Chartist.plugins.tooltip()],
		/*
		,
		'series-3': {
			showPoint: false
		}
		plugins: [
		Chartist.plugins.ctAxisTitle({
		axisX: {
			axisTitle: 'Days',
			axisClass: 'ct-axis-title',
			offset: {
			x: 0,
			y: 50
			},
			textAnchor: 'middle'
		},
		axisY: {
			axisTitle: 'Total cases',
			axisClass: 'ct-axis-title',
			offset: {
			x: 0,
			y: 0
			},
			textAnchor: 'middle',
			flipTitle: false
		}
		})
		],
		chartPadding: {
		right: 40
		}*/
	};

	var DSIChart = new Chartist.Line(".ct-chart", chartData, chartOptions);
	// Let's put a sequence number aside so we can use it in the event callbacks
	var seq = 0,
		delays = 80,
		delays0 = 0,
		durations = 500,
		durations0 = 0;

	// Once the chart is fully created we reset the sequence
	DSIChart.on("created", function () {
		seq = 0;
	});
	// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
	DSIChart.on("draw", function (data) {
		seq++;

		if (data.type === "line") {
			// If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
			data.element.animate({
				opacity: {
					// The delay when we like to start the animation
					//begin: seq * delays + 1000,
					begin: 100,
					// Duration of the animation
					//dur: durations,
					dur: 260,
					// The value where the animation should start
					from: 0,
					// The value where it should end
					to: 1,
					easing: Chartist.Svg.Easing.easeOutQuint,
				},
			});
		} 
		/*
		else if (data.type === "label" && data.axis === "x") {
			data.element.animate({
				y: {
					begin: seq * delays0,
					dur: durations0,
					from: data.y + 100,
					to: data.y,
					// We can specify an easing function from Chartist.Svg.Easing
					easing: "easeOutQuart",
				},
			});
		} else if (data.type === "label" && data.axis === "y") {
			data.element.animate({
				x: {
					begin: seq * delays0,
					dur: durations0,
					from: data.x - 100,
					to: data.x,
					easing: "easeOutQuart",
				},
			});
		} else if (data.type === "point") {
			data.element.animate({
				x1: {
					begin: seq * delays0,
					dur: durations0,
					from: data.x - 10,
					to: data.x,
					easing: "easeOutQuart",
				},
				x2: {
					begin: seq * delays0,
					dur: durations0,
					from: data.x - 10,
					to: data.x,
					easing: "easeOutQuart",
				},
				opacity: {
					begin: seq * delays0,
					dur: durations0,
					from: 0,
					to: 1,
					easing: "easeOutQuart",
				},
			});
		} else if (data.type === "grid") {
			// Using data.axis we get x or y which we can use to construct our animation definition objects
			var pos1Animation = {
				begin: seq * delays0,
				dur: durations0,
				from: data[data.axis.units.pos + "1"] - 30,
				to: data[data.axis.units.pos + "1"],
				easing: "easeOutQuart",
			};

			var pos2Animation = {
				begin: seq * delays0,
				dur: durations0,
				from: data[data.axis.units.pos + "2"] - 100,
				to: data[data.axis.units.pos + "2"],
				easing: "easeOutQuart",
			};

			var animations = {};
			animations[data.axis.units.pos + "1"] = pos1Animation;
			animations[data.axis.units.pos + "2"] = pos2Animation;
			animations["opacity"] = {
				begin: seq * delays0,
				dur: durations0,
				from: 0,
				to: 1,
				easing: "easeOutQuart",
			};

			data.element.animate(animations);
		}
		*/
	});

	// For the sake of the example we update the chart every time it's created with a delay of 10 seconds
	/*
	DSIChart.on("created", function () {
			if (window.__exampleAnimateTimeout) {
				clearTimeout(window.__exampleAnimateTimeout);
				window.__exampleAnimateTimeout = null;
			}
			window.__exampleAnimateTimeout = setTimeout(
				DSIChart.update.bind(chart),
				12000
			);
	});
	*/

		/*
	DSIChart.on('draw', function(data) {
		if(data.type === 'line' || data.type === 'area') {
		data.element.animate({
			d: {
			begin: 2000 * data.index,
			dur: 2000,
			from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
			to: data.path.clone().stringify(),
			easing: Chartist.Svg.Easing.easeOutQuint
			}
		});
		}
	});
	*/

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
};
