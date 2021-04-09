import { ConfigService } from './config.service';
import { Domino } from './domino.model';
import { DataService } from './data.service';

import { PdfCreatorService } from './pdfCreator.service';

const configService = new ConfigService();
const dataService = new DataService();

const dominos: Domino[] = dataService.getData();

const document = new PdfCreatorService(configService);

document.drawDominos(dominos);
// document.drawDomino(300);
document.save();
