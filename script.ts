const totalWidth = 1900;
const totalHeight = 1000;

type ComplexNumber = {
  real: number;
  coefficient: number;
};

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

const calculateIterations = () => {
  const iterations = new Array(1000);
  for (let i = 0; i < iterations.length; i++) {
    iterations[i] = new Array(1000);
  }

  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      let currentIterations = 0;
      const z: ComplexNumber = {
        real: 0,
        coefficient: 0,
      };
      let next = fc(z, {
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

const drawPixel = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  iterations: number
) => {
  ctx.fillStyle = getColor(iterations);
  ctx.fillRect(x, y, 1, 1);
};

const draw = (ctx: CanvasRenderingContext2D, iterations: number[][]) => {
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      drawPixel(ctx, i, j, iterations[i][j]);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app") as HTMLCanvasElement;

  app.height = 1000;
  app.width = 1000;

  const ctx = app.getContext("2d");

  const iterations = calculateIterations();
  draw(ctx, iterations);
});
