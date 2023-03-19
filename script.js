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
    if (iterations > 80) {
        return "purple";
    }
    if (iterations > 50) {
        return "blue";
    }
    if (iterations > 20) {
        return "green";
    }
    if (iterations > 5) {
        return "yellow";
    }
    if (iterations > 3) {
        return "red";
    }
    return "#caf0f8";
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
    for (let i = 0; i < 2400; i++) {
        for (let j = 0; j < 1500; j++) {
            let currentIterations = 0;
            let next = fc(z, {
                real: (x1 * i) / 1000,
                coefficient: (y1 * j) / 1000,
            });
            if (i < 800) {
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
                if (currentIterations < 200) {
                    drawPixel(ctx, currentIterations, 1, i, j);
                }
            }
            currentIterations = 0;
            next = fc(z, {
                real: (x4 * i) / 1000,
                coefficient: (y4 * j) / 1000,
            });
            while (currentIterations < 1000) {
                if (Math.pow(next.real * next.coefficient, 2) > 5000) {
                    break;
                }
                next = fc(next, {
                    real: (x4 * i) / 1000,
                    coefficient: (y4 * j) / 1000,
                });
                currentIterations++;
            }
            if (currentIterations < 200) {
                drawPixel(ctx, currentIterations, 4, i, j);
            }
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
    app.height = 2400;
    app.width = 3000;
    const ctx = app.getContext("2d");
    if (!ctx)
        return;
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, app.width, app.height);
    ctx.translate(2200, 1200);
    draw(ctx);
});
