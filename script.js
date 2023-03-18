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
    return addComplexNumbers(squareComplexNumber(z), c);
};
var getColor = function (iterations) {
    if (iterations > 900) {
        return "black";
    }
    if (iterations > 600) {
        return "blue";
    }
    if (iterations > 300) {
        return "purple";
    }
    if (iterations > 100) {
        return "yellow";
    }
    return "red";
};
var calculateIterations = function () {
    var iterations = new Array(1000);
    for (var i = 0; i < iterations.length; i++) {
        iterations[i] = new Array(1000);
    }
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            var currentIterations = 0;
            var z = {
                real: 0,
                coefficient: 0,
            };
            var next = fc(z, {
                real: i / 1000,
                coefficient: j / 1000,
            });
            while (currentIterations < 1000) {
                if (Math.pow(next.real * next.coefficient, 2) > 50) {
                    break;
                }
                next = fc(next, {
                    real: i / 1000,
                    coefficient: j / 1000,
                });
                currentIterations++;
            }
            iterations[i][j] = currentIterations;
        }
    }
    return iterations;
};
var drawPixel = function (ctx, x, y, iterations) {
    ctx.fillStyle = getColor(iterations);
    ctx.fillRect(x, y, 1, 1);
};
var draw = function (ctx, iterations) {
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            drawPixel(ctx, i, j, iterations[i][j]);
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var app = document.getElementById("app");
    app.height = 1000;
    app.width = 1000;
    var ctx = app.getContext("2d");
    var iterations = calculateIterations();
    draw(ctx, iterations);
});
