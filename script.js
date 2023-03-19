"use strict";
const addComplexNumbers = (x, y) => {
    const sum = {
        real: x.real + y.real,
        coefficient: x.coefficient + y.coefficient,
    };
    return sum;
};
const squareComplexNumber = (x) => {
    const square = {
        real: Math.pow(x.real, 2) - Math.pow(x.coefficient, 2),
        coefficient: 2 * x.real * x.coefficient,
    };
    return square;
};
const fc = (z, c) => {
    return addComplexNumbers(squareComplexNumber(z), c);
};
const getColor = (iterations) => {
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
const getMultiplier = (quadrant) => {
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
const draw = (ctx) => {
    const [x1, y1] = getMultiplier(1);
    const [x4, y4] = getMultiplier(4);
    const z = {
        real: 0,
        coefficient: 0,
    };
    for (let i = 0; i < 2000; i++) {
        for (let j = 0; j < 2000; j++) {
            let currentIterations = 0;
            let next = fc(z, {
                real: (x1 * i) / 1000,
                coefficient: (y1 * j) / 1000,
            });
            while (currentIterations < 1000) {
                if (Math.pow(next.real * next.coefficient, 2) > 50) {
                    break;
                }
                next = fc(next, {
                    real: (x1 * i) / 1000,
                    coefficient: (y1 * j) / 1000,
                });
                currentIterations++;
            }
            drawPixel(ctx, currentIterations, 1, i, j);
            currentIterations = 0;
            next = fc(z, {
                real: (x4 * i) / 1000,
                coefficient: (y4 * j) / 1000,
            });
            while (currentIterations < 1000) {
                if (Math.pow(next.real * next.coefficient, 2) > 50) {
                    break;
                }
                next = fc(next, {
                    real: (x4 * i) / 1000,
                    coefficient: (y4 * j) / 1000,
                });
                currentIterations++;
            }
            drawPixel(ctx, currentIterations, 4, i, j);
        }
    }
};
const drawPixel = (ctx, iterations, quadrant, x, y) => {
    const [offsetX, offsetY] = getMultiplier(quadrant);
    let [otherOffsetX, otherOffsetY] = [0, 0];
    if (quadrant === 1) {
        [otherOffsetX, otherOffsetY] = getMultiplier(2);
    }
    else {
        [otherOffsetX, otherOffsetY] = getMultiplier(3);
    }
    ctx.fillStyle = getColor(iterations);
    ctx.fillRect(x * offsetX, offsetY * y, 1, 1);
    ctx.fillRect(x * otherOffsetX, otherOffsetY * y, 1, 1);
};
document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    app.height = 3000;
    app.width = 4000;
    const ctx = app.getContext("2d");
    if (!ctx)
        return;
    ctx.translate(3000, 1500);
    draw(ctx);
});
