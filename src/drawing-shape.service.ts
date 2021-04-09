import { Domino, FaceType } from './domino.model';

export class DrawingShapeSerive {
  document: PDFKit.PDFDocument;

  PADDING = 10;

  constructor(document: PDFKit.PDFDocument) {
    this.document = document;
  }

  drawDomino(
    domino: Domino,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.drawRectangle(x, y, width, height);
    this.drawSeparator(x + width / 2, y, height);

    if (domino.faceLeftType === FaceType.IMAGE) {
      try {
        this.document.image(
          `./inputs/images/${domino.faceLeft}`,
          x + this.PADDING,
          y + this.PADDING,
          {
            align: 'center',
            valign: 'center',
            width: width / 2 - this.PADDING * 2,
            height: height - this.PADDING * 2
          }
        );
      } catch (error) {
        console.log(
          `Impossible to read the file ./inputs/images/${domino.faceLeft}`
        );
      }
    } else {
      this.document.text(domino.faceLeft, x + this.PADDING, y + height / 2, {
        align: 'center',
        width: width / 2 - this.PADDING * 2,
        height: height / 2
      });
    }

    if (domino.faceRightType === FaceType.IMAGE) {
      try {
        this.document.image(
          `./inputs/images/${domino.faceRight}`,
          x + width / 2 + this.PADDING,
          y + this.PADDING,
          {
            align: 'center',
            width: width / 2 - this.PADDING * 2,
            height: height - this.PADDING * 2
          }
        );
      } catch (error) {
        console.log(
          `Impossible to read the file ./inputs/images/${domino.faceRight}`
        );
      }
    } else {
      this.document.text(domino.faceRight, x + width / 2 + 10, y + height / 2, {
        align: 'center',
        width: width / 2 - 20,
        height: height / 2
      });
    }
  }

  /**
   * Draw vertical line
   * @param x coordinate of the x axis of the stroke
   * @param y coordinate of the y axis of the top of the stroke
   * @param width
   * @param height
   */
  drawSeparator(x: number, y: number, height: number): void {
    this.document
      .moveTo(x, y + 7)
      .lineTo(x, y + height - 7)
      .stroke();
  }

  /**
   *
   * @param x coordinate of the x axis on the top left corner
   * @param y coordinate of the y axis on the top left corner
   * @param width of the rectangle
   * @param height of the rectangle
   */
  drawRectangle(x: number, y: number, width: number, height: number): void {
    this.document
      .moveTo(x, y)
      .lineTo(x + width, y)
      .lineTo(x + width, y + height)
      .lineTo(x, y + height)
      .lineTo(x, y)
      .stroke();
  }
}
