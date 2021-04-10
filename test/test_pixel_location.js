//import { pixel_coordinate } from "../js/pixel_location";
const {pixel_coordinate} = require('../js/pixel_location')
var assert = require('assert');


describe('pixel_location', function(){
    describe('0 tests', function(){
        it('Should return just the channel value', function(){
            assert.strictEqual(0, pixel_coordinate(0,0,0, 100));
        })
    })
});