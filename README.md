![Degas](https://s3.amazonaws.com/cgldemo/degas/degas-logo.jpg)

# Degas

Degas is an SVG drawing library.

## Installation

`npm i @cgl2/degas --save`


## Usage
<a name="SVGRef"></a>

## SVGRef()
. SVG Ref is the base class for all SVG drawing.

**Kind**: global function  

* [SVGRef()](#SVGRef)
    * [.toString()](#SVGRef+toString)
    * [.clear()](#SVGRef+clear)
    * [.setFillColor(color)](#SVGRef+setFillColor)
    * [.setStrokeColor(color)](#SVGRef+setStrokeColor)
    * [.setStrokeWidth(width)](#SVGRef+setStrokeWidth)
    * [.beginCircle(centerX, centerY, radius)](#SVGRef+beginCircle)
    * [.endCircle()](#SVGRef+endCircle)
    * [.beginRect(x, y, width, height)](#SVGRef+beginRect)
    * [.endRect()](#SVGRef+endRect)
    * [.beginText(x, y, text, options)](#SVGRef+beginText)
    * [.endText()](#SVGRef+endText)
    * [.beginPath()](#SVGRef+beginPath)
    * [.moveToPoint(x, y)](#SVGRef+moveToPoint)
    * [.addLineToPoint(x, y)](#SVGRef+addLineToPoint)
    * [.endPath()](#SVGRef+endPath)
    * [.end()](#SVGRef+end)

<a name="SVGRef+toString"></a>

### svgRef.toString()
Returns an SVG string representing all operations currently applied to the SVGRef

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  
<a name="SVGRef+clear"></a>

### svgRef.clear()
. Clears any existing state from the current ref.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  
<a name="SVGRef+setFillColor"></a>

### svgRef.setFillColor(color)
Sets the fill color.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | rgb, rgba, or hex color string |

<a name="SVGRef+setStrokeColor"></a>

### svgRef.setStrokeColor(color)
Sets the stroke color.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | rgb, rgba, or hex color string |

<a name="SVGRef+setStrokeWidth"></a>

### svgRef.setStrokeWidth(width)
Sets the stroke width

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | the width, in pixels, for the updated stroke. |

<a name="SVGRef+beginCircle"></a>

### svgRef.beginCircle(centerX, centerY, radius)
Begins a new SVGCircle element.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  

| Param | Type | Description |
| --- | --- | --- |
| centerX | <code>number</code> | the x center |
| centerY | <code>number</code> | the y center |
| radius | <code>number</code> | the radius of the circle |

<a name="SVGRef+endCircle"></a>

### svgRef.endCircle()
Ends a circle.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  
<a name="SVGRef+beginRect"></a>

### svgRef.beginRect(x, y, width, height)
. Begins a new  SVGRect element

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | the X coordinate |
| y | <code>number</code> | the Y coordinate |
| width | <code>number</code> | the width for the rect |
| height | <code>number</code> | the height for the rect |

<a name="SVGRef+endRect"></a>

### svgRef.endRect()
Ends the current rect

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  
<a name="SVGRef+beginText"></a>

### svgRef.beginText(x, y, text, options)
Begins a a new SVGText node

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | the X coordinate |
| y | <code>number</code> | the Y coordinate |
| text | <code>string</code> | the contents of the text node |
| options | <code>Object</code> | options to control display. Valid options include fontFamily, fontSize, fontWeight, and textAnchor. All are tied to their CSS counterparts. |

<a name="SVGRef+endText"></a>

### svgRef.endText()
Ends the current SVGText node

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  
<a name="SVGRef+beginPath"></a>

### svgRef.beginPath()
Begins a new SVGPath node

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  
<a name="SVGRef+moveToPoint"></a>

### svgRef.moveToPoint(x, y)
Moves the current node to a given point. Applicable to SVGPath.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | the X coordinate |
| y | <code>number</code> | the Y coordinate |

<a name="SVGRef+addLineToPoint"></a>

### svgRef.addLineToPoint(x, y)
Adds a line to a given point. Applicable to SVGPath.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | the X coordinate |
| y | <code>number</code> | the Y coordinate |

<a name="SVGRef+endPath"></a>

### svgRef.endPath()
Ends the current SVGPath node.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  
<a name="SVGRef+end"></a>

### svgRef.end()
Ends the current element. This can be generically applied to all SVGRef subclasses.

**Kind**: instance method of [<code>SVGRef</code>](#SVGRef)  
