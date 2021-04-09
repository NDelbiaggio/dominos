import * as path from 'path';
import * as fs from 'fs';

export interface ConfigOptions {
  dominoPerRow?: number;
  fontFileName?: string;
  fontSize?: number;
}

export class ConfigService {
  private dataSrc = path.join(__dirname, '..', 'inputs', 'config.json');
  constructor() {}

  getConfig(): ConfigOptions {
    const rawData = fs.readFileSync(this.dataSrc);
    const data = JSON.parse(rawData.toString()) as ConfigOptions;
    return data;
  }
}
