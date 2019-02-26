
const svg_ref = require('./lib/svg_ref');

/**
*  Creates a new instance of SVGRef, given a width and height. 
*  @see {@link #SVGRef} for more on drawing operations.
*
*  @param {number} width - the total needed width for the canvas 
*  @param {number} height - the total needed height for the canvas 
*/
module.exports.createSVG = function(width, height){
    return new svg_ref(width, height);
}
