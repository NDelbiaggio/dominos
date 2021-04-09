import { ConfigService } from './config.service';
import { Domino } from './domino.model';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { DrawingShapeSerive as DrawingShapeService } from './drawing-shape.service';

export class PdfCreatorService {
  private drawingShapeService: DrawingShapeService;
  document: PDFKit.PDFDocument;

  OUTPUT_NAME = 'Dominos.pdf';
  dominoPerRow = 2;
  MARGIN_WIDTH_BETWEEN_DOMINO = 5;
  MARGIN_HEIGHT_BETWEEN_DOMINO = 10;

  constructor(private configService: ConfigService) {
    this.initDoc();
  }

  private initDoc(): void {
    const {
      dominoPerRow,
      fontFileName,
      fontSize
    } = this.configService.getConfig();

    this.dominoPerRow = dominoPerRow;
    this.document = new PDFDocument({ margin: 50, pdfVersion: '1.7' });
    this.document.fontSize(fontSize);

    this.document.font(
      path.join(__dirname, '..', 'inputs', 'fonts', fontFileName)
    );
    this.drawingShapeService = new DrawingShapeService(this.document);
  }

  drawDomino(domino: Domino, x = 5, y = 5, width = 280, height = 140): void {
    this.drawingShapeService.drawDomino(domino, x, y, width, height);
  }

  /**
   * Draw the given dominos on the pdf
   * @param dominos
   */
  drawDominos(dominos: Domino[]): void {
    const availableWidth =
      this.document.page.width -
      this.dominoPerRow * 2 * this.MARGIN_WIDTH_BETWEEN_DOMINO;
    const dominoWidth = availableWidth / this.dominoPerRow;
    const dominoHeight = dominoWidth / 2;
    const rowsPerPage = Math.floor(
      this.document.page.height /
        (this.MARGIN_HEIGHT_BETWEEN_DOMINO + dominoHeight)
    );

    dominos.forEach((domino, index) => {
      const positionIndex = index % this.dominoPerRow;
      const sumMarginWidth =
        (positionIndex * 2 + 1) * this.MARGIN_WIDTH_BETWEEN_DOMINO;
      const sumDominosWidth = positionIndex * dominoWidth;
      const x = sumMarginWidth + sumDominosWidth;

      const dominosFloor = Math.floor(index / this.dominoPerRow) % rowsPerPage;
      const sumMarginHeight =
        (dominosFloor + 1) * this.MARGIN_HEIGHT_BETWEEN_DOMINO;
      const sumDominosHeight = dominosFloor * dominoHeight;
      const y = sumMarginHeight + sumDominosHeight;

      this.drawDomino(domino, x, y, dominoWidth, dominoHeight);

      // creates a new page if there are more dominos and this is the last row and last domino of the row
      if (index + 1 < dominos.length) {
        if (
          dominosFloor + 1 == rowsPerPage &&
          positionIndex == this.dominoPerRow - 1
        ) {
          this.document.addPage();
        }
      }
    });
  }

  /**
   * Ends the document and write it to a pdf file
   */
  save(): void {
    this.document.end();
    this.document.pipe(fs.createWriteStream(this.OUTPUT_NAME));
  }
}
