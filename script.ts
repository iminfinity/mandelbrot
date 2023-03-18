const totalWidth = 1900;
const totalHeight = 1000;

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
});
