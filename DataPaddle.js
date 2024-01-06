export class DataPaddle {
  constructor(params) {
    this.params = params;
    this.colour = params.colour;
    this.isLeft = params.type === "left";
    this.x = this.isLeft
      ? params.bounds.left
      : params.bounds.right - params.width;
    this.bounds = {
      top: params.bounds.top,
      bottom: params.bounds.bottom - params.height,
    };
  }
}
