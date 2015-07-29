(function() {

	var colors = d3.scale.quantize()
		.range(colorbrewer.Blues[7]);

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
	        return formats(r[0])+' - '+formats(r[1]) ;
	    });
})();