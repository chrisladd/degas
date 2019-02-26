
const assert = require('chai').assert;
const degas = require('../');

function assertSVGContainsString(svg, s) {
    if (svg.indexOf(s) < 0) {
        assert.ok(false, `svg should contain ${s}`);
    }
}

describe('degas basics', function(){
    
    it('should create svgs', function(){
        let ref = degas.createSVG(200, 200);
        ref.beginCircle(100, 100, 50).endCircle();
        let svg = ref.svg();

        assert.ok(svg);
        assertSVGContainsString(svg, '<svg');
        assertSVGContainsString(svg, '<circle');
        
    })
})