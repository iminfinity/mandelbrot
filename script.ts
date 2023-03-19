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
    return "pink";
  }
  if (iterations > 2) {
    return "red";
  }
  return "#caf0f8";
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

const draw = (ctx: CanvasRenderingContext2D) => {
  const [x1, y1] = getMultiplier(1);
  const [x4, y4] = getMultiplier(4);

  const z: ComplexNumber = {
    real: 0,
    coefficient: 0,
  };

  for (let i = 0; i < 3000; i++) {
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

      if (currentIterations < 200) {
        drawPixel(ctx, currentIterations, 1, i, j);
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

const drawPixel = (
  ctx: CanvasRenderingContext2D,
  iterations: number,
  quadrant: Quadrant,
  x: number,
  y: number
) => {
  const [offsetX, offsetY] = getMultiplier(quadrant);
  let [otherOffsetX, otherOffsetY] = [0, 0];
  if (quadrant === 1) {
    [otherOffsetX, otherOffsetY] = getMultiplier(2);
  } else {
    [otherOffsetX, otherOffsetY] = getMultiplier(3);
  }
  ctx.fillStyle = getColor(iterations);
  ctx.fillRect(x * offsetX, offsetY * y, 1, 1);
  ctx.fillRect(x * otherOffsetX, otherOffsetY * y, 1, 1);
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app") as HTMLCanvasElement;

  app.height = 3000;
  app.width = 5000;

  const ctx = app.getContext("2d");

  if (!ctx) return;

  ctx.fillStyle = "#101010";
  ctx.fillRect(0, 0, app.width, app.height);

  ctx.translate(3000, 1500);

  draw(ctx);
});
