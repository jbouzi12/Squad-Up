(function() {

	var colorRange = colorbrewer.Reds[7]
	
	var colors = d3.scale.quantize()
		.range(colorRange);

	console.log(colors.range())
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

	var mapColor = 'white';
	var width = 900;
	var height = 540;

	var projection = d3.geo.albersUsa();

	var svg = d3.select('#map').append('svg')
		.attr('width', width)
		.attr('height', height);

	var path = d3.geo.path()
		.projection(projection);

	var g = svg.append('g');

	// Tooltip for each State
	var tooltip = d3.select('#map')
		.append('div')
		.attr('class', 'tooltip')
		.classed('hidden', true);
	
	tooltip.append('div')
		.attr('class', 'label');

	// tooltip.append('div')
	// 	.attr('class', 'label');

	// tooltip.append('div')
	// 	.attr('class', 'label');


	tooltip.append('div')
		.attr('class', 'tweet_percent');

	// Draw map from json data
	d3.json('json/us-states.json', function(err, topology) {
		g.selectAll('path')
			.data(topojson.feature(topology, topology.objects.usStates).features)
			.enter()
			.append('path')
			.attr('d', path);

		var states = topojson.feature(topology, topology.objects.usStates).features;
		var state = g.selectAll('.state').data(states);

		// Display tooltip with stats on hover
		state.enter().insert('path')
			.attr('class', function(d) {return 'state ' + d.properties.STATE_ABBR;})
			.attr('d',path)
			.attr('fill', mapColor)

			.on('mouseenter', function(d,i) {
				var mouse = d3.mouse(svg.node()).map(function(d) {return parseInt(d);});
				tooltip.classed('hidden', false)
					.attr("style", "left:"+(mouse[0]+105)+"px;top:"+(mouse[1]-30)+"px");
          		tooltip.selectAll('.label').html(d.properties.name);

			})
			.on('mouseout', function(d) {
				tooltip.classed('hidden', true);
			});

	})


})();