import * as path from 'path';
import * as fs from 'fs';
import { Domino } from './domino.model';

import Joi from 'joi';

const DataSchema = Joi.array().items(
  Joi.object({
    faceLeft: Joi.string().required(),
    faceLeftType: Joi.string().valid('TEXT', 'IMAGE'),
    faceRight: Joi.string().required(),
    faceRightType: Joi.string().valid('TEXT', 'IMAGE')
  })
);

export class DataService {
  private dataSrc = path.join(__dirname, '..', 'inputs', 'data.json');
  constructor() {}
  getData(): Domino[] {
    try {
      const rawData = fs.readFileSync(this.dataSrc);
      const data = JSON.parse(rawData.toString()) as Domino[];
      const { error } = DataSchema.validate(data);
      if (error) {
        console.log(error.message);
        process.exit();
      }
      return data;
    } catch (error) {
      console.error(
        'Impossible to read the data file, please ensure it is a JSON format'
      );
      process.exit();
    }
  }
}
