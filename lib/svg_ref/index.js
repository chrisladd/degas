

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

/**** Ref ****/

/**
*. SVG Ref is the base class for all SVG drawing.
*/
var SVGRef = function(width, height) {
  this.output = ''
  this.width = width
  this.height = height
  this.comment = '';
}

/**
 *  Returns an SVG string representing all operations currently applied to the SVGRef
*/
SVGRef.prototype.toString = function() {
  s = "<svg";

  if (this.comment && this.comment.length) {
    s += " comment=\"" + this.comment + "\"";
  }

  s += " viewBox=\"0, 0, ";
  s = s + this.width + ", " + this.height + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" xmlns=\"http://www.w3.org/2000/svg\">";
  s = s + this.output;
  s = s + "</svg>";
  return s;
};

/**
*. Clears any existing state from the current ref.
*/
SVGRef.prototype.clear = function() {
  this.strokeColor = null;
  this.fillColor = null;
  this.strokeWidth = null;
  return this;
};

SVGRef.prototype.updateElementAttributes = function(el) {
  el.strokeColor = this.strokeColor;
  el.fillColor = this.fillColor;
  el.strokeWidth = this.strokeWidth;
};

/**
* Sets the fill color.
* @param {string} color - rgb, rgba, or hex color string
*/
SVGRef.prototype.setFillColor = function(color) {
  this.fillColor = color
  if (this.currentElement) {
    this.currentElement.fillColor = color 
  }

  return this;
};

/**
* Sets the stroke color.
* @param {string} color - rgb, rgba, or hex color string
*/
SVGRef.prototype.setStrokeColor = function(color) {
  this.strokeColor = color
  if (this.currentElement) {
    this.currentElement.strokeColor = color 
  }

  return this;
};

/**
* Sets the stroke width
* @param {number} width - the width, in pixels, for the updated stroke.
*/
SVGRef.prototype.setStrokeWidth = function(width) {
  this.strokeWidth = width
  if (this.currentElement) {
    this.currentElement.strokeWidth = width
  }

  return this;
};

/**
* Begins a new SVGCircle element.
*
* @param {number} centerX - the x center
* @param {number} centerY - the y center
* @param {number} radius - the radius of the circle
*/
SVGRef.prototype.beginCircle = function(centerX, centerY, radius) {
  var circle = new SVGCircle(centerX, centerY, radius);

  this.currentElement = circle;
  this.updateElementAttributes(circle)
  return this;
};

/**
* Ends a circle. 
*/
SVGRef.prototype.endCircle = function() {
  this.end();
  return this;
};

/**
*. Begins a new  SVGRect element
*
* @param {number} x - the X coordinate
* @param {number} y - the Y coordinate
* @param {number} width - the width for the rect
* @param {number} height - the height for the rect
*/
SVGRef.prototype.beginRect = function(x, y, width, height) {
  var rect = new SVGRect(x, y, width, height);
  this.currentElement = rect;
  this.updateElementAttributes(rect);
  return this;
};

/**
* Ends the current rect
*/
SVGRef.prototype.endRect = function() {
  this.end();
  return this;
};

/**
* Begins a a new SVGText node
*
* @param {number} x - the X coordinate
* @param {number} y - the Y coordinate
* @param {string} text - the contents of the text node
* @param {Object} options - options to control display. Valid options include fontFamily, fontSize, fontWeight, and textAnchor. All are tied to their CSS counterparts.
*/
SVGRef.prototype.beginText = function(x, y, text, options) {
  var text = new SVGText(x, y, text, options);
  this.currentElement = text;
  this.updateElementAttributes(text);
  return this;
};

/**
* Ends the current SVGText node
*/
SVGRef.prototype.endText = function() {
  this.end();
  return this;
};

/**
* Begins a new SVGPath node
*/
SVGRef.prototype.beginPath = function() {
  this.currentElement = new SVGPath();
  this.updateElementAttributes(this.currentElement)
};

/**
* Moves the current node to a given point. Applicable to SVGPath.
*
* @param {number} x - the X coordinate
* @param {number} y - the Y coordinate
*/
SVGRef.prototype.moveToPoint = function(x, y) {
  this.currentElement.addCommand("M " + x + " " + y + "")
  return this;
};

/**
* Adds a line to a given point. Applicable to SVGPath.
*
* @param {number} x - the X coordinate
* @param {number} y - the Y coordinate
*/
SVGRef.prototype.addLineToPoint = function(x, y) {
  this.currentElement.addCommand("L " + x + " " + y + "")
  return this;
};

/**
* Ends the current SVGPath node.
*/
SVGRef.prototype.endPath = function() {
  return this.end();
};

/**
* Ends the current element. This can be generically applied to all SVGRef subclasses.
*/
SVGRef.prototype.end = function() {
  this.output = this.output + this.currentElement.toString();
  this.currentElement = null;
  return this;
};

/**** Element ****/

var SVGElement = function() {
  this.commands = []
  this.name = 'undefined'
}

SVGElement.prototype.addCommand = function(command) {
  if (command) {
    this.commands.push(command)
  }
};

SVGElement.prototype.attributeWithNameAndData = function(name, data) {
    s = ""
    s = s + name
    s = s + '="'
    s = s + data
    s = s + '"'

    return s
};

// for use by subclasses
SVGElement.prototype.customAttributes = function() {
  return [];
};

SVGElement.prototype.attributes = function() {
  attributes = [];

  if (this.commands && this.commands.length > 0) {
    attributes.push(this.attributeWithNameAndData('d', this.commands.join(' ')))
  }

  if (this.strokeColor) {
    attributes.push(this.attributeWithNameAndData('stroke', this.strokeColor))
  }

  if (this.strokeWidth) {
    attributes.push(this.attributeWithNameAndData('stroke-width', this.strokeWidth))  
  }

  var fill = this.fillColor
  if (!fill) {
    fill = 'transparent'
  }

  if (fill) {
    attributes.push(this.attributeWithNameAndData('fill', fill))
  }

  if (this.extraAttributes) {
    attributes = attributes.concat(this.extraAttributes);
  }

  return attributes;
};

SVGElement.prototype.toString = function() {
  s = "<" + this.name + ' ';
  s = s + this.attributes().join(' ');
  s = s + '>';

  if (this.innerContents) {
    s = s + this.innerContents;
  }

  s = s + '</' + this.name + '>'

  return s  
};


var SVGPath = function () {
  this.commands = []
  this.name = 'path'  
}

var SVGCircle = function(x, y, radius) {
  this.name = 'circle';
  this.x = x;
  this.y = y;
  this.radius = radius;

  this.commands = [];

  var attributes = []
  attributes.push(this.attributeWithNameAndData('cx', this.x))
  attributes.push(this.attributeWithNameAndData('cy', this.y))
  attributes.push(this.attributeWithNameAndData('r', this.radius))

  this.extraAttributes = attributes;
}

var SVGRect = function(x, y, width, height) {
  this.name = 'rect'
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  var attributes = []
  attributes.push(this.attributeWithNameAndData('x', this.x))
  attributes.push(this.attributeWithNameAndData('y', this.y))
  attributes.push(this.attributeWithNameAndData('width', this.width))
  attributes.push(this.attributeWithNameAndData('height', this.height))
  this.extraAttributes = attributes

  this.commands = [];
}

var SVGText = function(x, y, text, options) {
  this.name = 'text'
  this.x = x;
  this.y = y;
  this.text = text;
  this.fontFamily = options.fontFamily
  this.fontWeight = options.fontWeight;
  this.fontSize = options.fontSize
  this.textAnchor = options.textAnchor
  this.innerContents = this.text

  var attributes = []
  attributes.push(this.attributeWithNameAndData('x', this.x))
  attributes.push(this.attributeWithNameAndData('y', this.y))

  if (this.fontFamily) {
    attributes.push(this.attributeWithNameAndData('font-family', this.fontFamily))
  }

  if (this.fontSize) {
    attributes.push(this.attributeWithNameAndData('font-size', this.fontSize))  
  }

  if (this.fontWeight) {
    attributes.push(this.attributeWithNameAndData('font-weight', this.fontWeight))
  }

  if (this.textAnchor) {
    attributes.push(this.attributeWithNameAndData('text-anchor', this.textAnchor))    
  }

  this.extraAttributes = attributes;
}

inheritsFrom(SVGCircle, SVGElement);
inheritsFrom(SVGRect, SVGElement);
inheritsFrom(SVGText, SVGElement);
inheritsFrom(SVGPath, SVGElement);


module.exports = SVGRef;
