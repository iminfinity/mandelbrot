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
    // color palettes from
    // https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
    // https://coolors.co/palette/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8
    if (iterations > 999) {
        return "#000000";
    }
    if (iterations > 950) {
        return "#212529";
    }
    if (iterations > 900) {
        return "#343A40";
    }
    if (iterations > 800) {
        return "#495057";
    }
    if (iterations > 700) {
        return "#6C757D";
    }
    if (iterations > 600) {
        return "#ADB5BD";
    }
    if (iterations > 500) {
        return "#CED4DA";
    }
    if (iterations > 400) {
        return "#DEE2E6";
    }
    if (iterations > 300) {
        return "#E9ECEF";
    }
    if (iterations > 200) {
        return "#F8F9FA";
    }
    if (iterations > 100) {
        return "#03045E";
    }
    if (iterations > 70) {
        return "#023E8A";
    }
    if (iterations > 60) {
        return "#0077B6";
    }
    if (iterations > 50) {
        return "#0096C7";
    }
    if (iterations > 80) {
        return "#00B4D8";
    }
    if (iterations > 60) {
        return "#48CAE4";
    }
    if (iterations > 30) {
        return "#90E0EF";
    }
    if (iterations > 10) {
        return "#ADE8F4";
    }
    return "#CAF0F8";
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
    var iterations = new Array(2000);
    for (var i = 0; i < iterations.length; i++) {
        iterations[i] = new Array(2000);
    }
    var _a = getMultiplier(quadrant), x = _a[0], y = _a[1];
    for (var i = 0; i < 2000; i++) {
        for (var j = 0; j < 2000; j++) {
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
var draw = function (ctx, iterations, quadrant) {
    var _a = getMultiplier(quadrant), offsetX = _a[0], offsetY = _a[1];
    for (var i = 0; i < 2000; i++) {
        for (var j = 0; j < 2000; j++) {
            ctx.fillStyle = getColor(iterations[i][j]);
            ctx.fillRect(i * offsetX, offsetY * j, 1, 1);
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var app = document.getElementById("app");
    app.height = 3000;
    app.width = 4000;
    var ctx = app.getContext("2d");
    ctx.translate(3000, 1500);
    var iterationsQuardantI = calculateIterations(1);
    var iterationsQuardantII = calculateIterations(2);
    var iterationsQuardantIII = calculateIterations(3);
    var iterationsQuardantIV = calculateIterations(4);
    draw(ctx, iterationsQuardantI, 1);
    draw(ctx, iterationsQuardantII, 2);
    draw(ctx, iterationsQuardantIII, 3);
    draw(ctx, iterationsQuardantIV, 4);
});
