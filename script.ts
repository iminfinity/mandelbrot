type ComplexNumber = {
  real: number;
  coefficient: number;
};

type Quadrant = 1 | 2 | 3 | 4;

type PixelInfo = {
  fillStyle: string;
  x: number;
  y: number;
};

const pixelInfo: PixelInfo[] = [];

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

const calculateIterations = () => {
  const [x1, y1] = getMultiplier(1);
  const [x4, y4] = getMultiplier(4);

  const z: ComplexNumber = {
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
          savePixelInfo(currentIterations, 1, i, j);
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
        savePixelInfo(currentIterations, 4, i, j);
      }
    }
  }
};

const savePixelInfo = (
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

  const fillStyle = getColor(iterations);

  pixelInfo.push({
    fillStyle: fillStyle,
    x: x * offsetX,
    y: y * offsetY,
  });
  pixelInfo.push({
    fillStyle: fillStyle,
    x: x * otherOffsetX,
    y: y * otherOffsetY,
  });
};

const draw = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < pixelInfo.length; i++) {
    ctx.fillStyle = pixelInfo[i].fillStyle;
    ctx.fillRect(pixelInfo[i].x, pixelInfo[i].y, 1, 1);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  if (!loading) return;

  const app = document.getElementById("app") as HTMLCanvasElement;
  const ctx = app.getContext("2d");
  if (!ctx) return;

  app.height = 2400;
  app.width = 3000;

  ctx.fillStyle = "#101010";
  ctx.fillRect(0, 0, app.width, app.height);

  ctx.translate(2200, 1200);

  calculateIterations();

  loading.remove();

  draw(ctx);
});
