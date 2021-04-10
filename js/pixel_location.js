
module.exports = {
    // 
    pixel_coordinate: function (x,y,c, dim) {
        var coordinate = (((x*dim) + y) * 4);
        return coordinate +  c;
    }
};