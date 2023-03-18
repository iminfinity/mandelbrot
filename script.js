var totalWidth = 1900;
var totalHeight = 1000;
var addComplexNumbers = function (x, y) {
    var sum = {
        real: x.real + y.real,
        coefficient: x.coefficient + y.coefficient,
    };
    return sum;
};
var squareComplexNumber = function (x) {
    var square = {
        real: Math.pow(x.real, 2) - Math.pow(x.coefficient, 2),
        coefficient: 2 * x.real * x.coefficient,
    };
    return square;
};
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
    console.log(addComplexNumbers({ real: 5, coefficient: 3 }, { real: 4, coefficient: 2 }));
    console.log(addComplexNumbers({ real: 3, coefficient: 1 }, { real: -1, coefficient: 2 }));
    console.log(squareComplexNumber({ real: 1, coefficient: 1 }));
});
