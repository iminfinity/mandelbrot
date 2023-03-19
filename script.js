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
var getMultiplier = function (quadrant) {
    switch (quadrant) {
        case 1:
            return [1, -1];
        case 2:
            return [1, 1];
        case 3:
            return [-1, 1];
        case 4:
            return [-1, -1];
    }
};
var calculateIterations = function (quadrant) {
    var iterations = new Array(1000);
    for (var i = 0; i < iterations.length; i++) {
        iterations[i] = new Array(1000);
    }
    var _a = getMultiplier(quadrant), x = _a[0], y = _a[1];
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            var currentIterations = 0;
            var z = {
                real: 0,
                coefficient: 0,
            };
            var next = fc(z, {
                real: (x * i) / 1000,
                coefficient: (y * j) / 1000,
            });
            while (currentIterations < 1000) {
                if (Math.pow(next.real * next.coefficient, 2) > 50) {
                    break;
                }
                next = fc(next, {
                    real: (x * i) / 1000,
                    coefficient: (y * j) / 1000,
                });
                currentIterations++;
            }
            iterations[i][j] = currentIterations;
        }
    }
    return iterations;
};
var drawPixel = function (ctx, x, y, iterations, quadrant) {
    var _a = getMultiplier(quadrant), offsetX = _a[0], offsetY = _a[1];
    ctx.fillStyle = getColor(iterations);
    ctx.fillRect(x * offsetX, offsetY * y, 1, 1);
};
var draw = function (ctx, iterations, quadrant) {
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            drawPixel(ctx, i, j, iterations[i][j], quadrant);
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var app = document.getElementById("app");
    app.height = 2000;
    app.width = 2000;
    var ctx = app.getContext("2d");
    var iterationsQuardantI = calculateIterations(1);
    var iterationsQuardantII = calculateIterations(2);
    var iterationsQuardantIII = calculateIterations(3);
    var iterationsQuardantIV = calculateIterations(4);
    ctx.translate(1000, 1000);
    draw(ctx, iterationsQuardantI, 1);
    draw(ctx, iterationsQuardantII, 2);
    draw(ctx, iterationsQuardantIII, 3);
    draw(ctx, iterationsQuardantIV, 4);
});
