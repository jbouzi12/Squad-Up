(function() {

	var colors = d3.scale.quantize()
		.range(colorbrewer.Reds[7]);

	// Map Legend
	var legend = d3.select('#legendbox')
	  .append('ul')
	    .attr('class', 'list-inline');

	var keys = legend.selectAll('li.key')
	    .data(colors.range());

	keys.enter().append('li')
	    .attr('class', 'key')
	    .style('border-top-color', String)
	    .text(function(d) {
	    	// Convert hexadecimal color to percentage range for that color
	        var r = colors.invertExtent(d);
	        // Format to percent 
	        var formats = d3.format('%')
	        return formats(r[0])+'-'+formats(r[1]) ;
	    });

	// US Map

	var mapColor = '#869EFF'
	var width = 900;
	var height = 540;

	var projection = d3.geo.albersUsa();

	var svg = d3.select('#map').append('svg')
		.attr('width', width)
		.attr('height', height);

	var path = d3.geo.path()
		.projection(projection);

	var g = svg.append('g');

	// Labels for each State
	var tooltip = d3.select('#map')
		.append('div')
		.attr('class', 'tooltip');
	
	tooltip.append('div')
		.attr('class', 'label');

	tooltip.append('div')
		.attr('class', 'tweet_percent');


	d3.json('json/us-states.json', function(err, topology) {
		g.selectAll('path')
			.data(topojson.feature(topology, topology.objects.usStates).features)
			.enter()
			.append('path')
			.attr('class', function(d) {return 'states' + d.properties.STATE_ABBR;})
			.attr('d', path)
			.attr('fill', mapColor)
			.on('mouseover', function(d) {
				tooltip.select('.label').html(d.properties.name);
				tooltip.style('display', 'block');

			})
			.on('mouseout', function(d) {
				tooltip.style('display', 'none')
			});

		// g.selectAll('path').on('mouseover', function(d) {
		// 	console.log(d);
		// 	var stateName = d.properties.STATE_ABBR;

		// });

		// g.selectAll('path').on('mouseout', function() {
		// 	tooltip.style('display','none')
		// })
	})


})();