
module.exports = {
    // 
    pixel_coordinate: function (x,y,c, dim) {
        var coordinate = (((y*dim) + x) * 4);
        return coordinate +  c;
    }
};