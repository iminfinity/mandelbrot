var totalWidth = 1900;
var totalHeight = 1000;
var fc = function (z, c) {
    return Math.pow(z, 2) + c;
};
var iterate = function () { };
var draw = function (ctx) {
    for (var i = 0; i < totalWidth; i++) {
        for (var j = 0; j < totalHeight; j++) {
            ctx.fillRect(i, j, 1, 1);
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var app = document.getElementById("app");
    app.height = totalHeight;
    app.width = totalWidth;
    var ctx = app.getContext("2d");
    draw(ctx);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 20);
});
