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

const fc = (z: number, c: number) => {
  return Math.pow(z, 2) + c;
};

const iterate = () => {};

const draw = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < totalWidth; i++) {
    for (let j = 0; j < totalHeight; j++) {
      ctx.fillRect(i, j, 1, 1);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app") as HTMLCanvasElement;

  app.height = totalHeight;
  app.width = totalWidth;

  const ctx = app.getContext("2d");

  draw(ctx);

  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 100, 20);

  console.log(
    addComplexNumbers({ real: 5, coefficient: 3 }, { real: 4, coefficient: 2 })
  );
  console.log(
    addComplexNumbers({ real: 3, coefficient: 1 }, { real: -1, coefficient: 2 })
  );
  console.log(squareComplexNumber({ real: 1, coefficient: 1 }));
});
