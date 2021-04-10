//import { pixel_coordinate } from "../js/pixel_location";
const {pixel_coordinate} = require('../js/pixel_location')
var assert = require('assert');


describe('pixel_location', function(){
    describe('0 tests', function(){
        it('Should return just the channel value', function(){
            assert.strictEqual(0, pixel_coordinate(0,0,0, 100));
        })
    })
    describe('5th pixel tests', function(){
        it('Should return just the channel value', function(){
            assert.strictEqual(20, pixel_coordinate(5,0,0, 100));
        })
    })
    describe('5-3 pixel tests', function(){
        it('Should return just the channel value', function(){
            assert.strictEqual(1220, pixel_coordinate(5,3,0, 100));
        })
    })
});