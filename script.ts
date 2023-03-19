const totalWidth = 1900;
const totalHeight = 1000;

type ComplexNumber = {
  real: number;
  coefficient: number;
};

type Quadrant = 1 | 2 | 3 | 4;

const addComplexNumbers = (x: ComplexNumber, y: ComplexNumber) => {
  const sum: ComplexNumber = {
    real: x.real + y.real,
    coefficient: x.coefficient + y.coefficient,
  };
  return sum;
};

const squareComplexNumber = (x: ComplexNumber) => {
  const square: ComplexNumber = {
    real: Math.pow(x.real, 2) - Math.pow(x.coefficient, 2),
    coefficient: 2 * x.real * x.coefficient,
  };
  return square;
};

const fc = (z: ComplexNumber, c: ComplexNumber) => {
  return addComplexNumbers(squareComplexNumber(z), c);
};

const getColor = (iterations: number) => {
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

const getMultiplier = (quadrant: Quadrant) => {
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

const calculateIterations = (quadrant: Quadrant) => {
  const iterations = new Array(1000);
  for (let i = 0; i < iterations.length; i++) {
    iterations[i] = new Array(1000);
  }

  const [x, y] = getMultiplier(quadrant);

  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      let currentIterations = 0;
      const z: ComplexNumber = {
        real: 0,
        coefficient: 0,
      };
      let next = fc(z, {
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

const drawPixel = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  iterations: number,
  quadrant: Quadrant
) => {
  const [offsetX, offsetY] = getMultiplier(quadrant);
  ctx.fillStyle = getColor(iterations);
  ctx.fillRect(x * offsetX, offsetY * y, 1, 1);
};

const draw = (
  ctx: CanvasRenderingContext2D,
  iterations: number[][],
  quadrant: Quadrant
) => {
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      drawPixel(ctx, i, j, iterations[i][j], quadrant);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app") as HTMLCanvasElement;

  app.height = 2000;
  app.width = 2000;

  const ctx = app.getContext("2d");

  const iterationsQuardantI = calculateIterations(1);
  const iterationsQuardantII = calculateIterations(2);
  const iterationsQuardantIII = calculateIterations(3);
  const iterationsQuardantIV = calculateIterations(4);

  ctx.translate(1000, 1000);

  draw(ctx, iterationsQuardantI, 1);
  draw(ctx, iterationsQuardantII, 2);
  draw(ctx, iterationsQuardantIII, 3);
  draw(ctx, iterationsQuardantIV, 4);
});
