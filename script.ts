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
    return "#CAF0F8";
  }
  if (iterations > 70) {
    return "#ADE8F4";
  }
  if (iterations > 60) {
    return "#90E0EF";
  }
  if (iterations > 50) {
    return "#48CAE4";
  }
  if (iterations > 80) {
    return "#00B4D8";
  }
  if (iterations > 60) {
    return "#0096C7";
  }
  if (iterations > 30) {
    return "#0077B6";
  }
  if (iterations > 10) {
    return "#023E8A";
  }

  return "#03045E";
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
  const iterations = new Array(2000);
  for (let i = 0; i < iterations.length; i++) {
    iterations[i] = new Array(2000);
  }

  const [x, y] = getMultiplier(quadrant);

  for (let i = 0; i < 2000; i++) {
    for (let j = 0; j < 2000; j++) {
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

const draw = (
  ctx: CanvasRenderingContext2D,
  iterations: number[][],
  quadrant: Quadrant
) => {
  const [offsetX, offsetY] = getMultiplier(quadrant);
  for (let i = 0; i < 2000; i++) {
    for (let j = 0; j < 2000; j++) {
      ctx.fillStyle = getColor(iterations[i][j]);
      ctx.fillRect(i * offsetX, offsetY * j, 1, 1);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app") as HTMLCanvasElement;

  app.height = 2000;
  app.width = 4000;

  const ctx = app.getContext("2d");

  ctx.translate(3500, 1000);

  const iterationsQuardantI = calculateIterations(1);
  const iterationsQuardantII = calculateIterations(2);
  const iterationsQuardantIII = calculateIterations(3);
  const iterationsQuardantIV = calculateIterations(4);

  draw(ctx, iterationsQuardantI, 1);
  draw(ctx, iterationsQuardantII, 2);
  draw(ctx, iterationsQuardantIII, 3);
  draw(ctx, iterationsQuardantIV, 4);
});
