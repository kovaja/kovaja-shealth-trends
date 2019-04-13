const csvToJson = require('csvtojson');
const fs = require('fs');

const DEFAULT_DELIMITER = ',';

module.exports = class DataConvertor {
  constructor(delimiter) {
    this.delimiter = delimiter || DEFAULT_DELIMITER;
  }

  stringify(json) {
    return JSON.stringify(json, null, 2);
  }

  readCSVRow(row, headers) {
    const data = row.split(this.delimiter);

    const json = {};

    for (let i = 0; i < headers.length; i += 1) {
      json[headers[i]] = data[i];
    }

    return json;
  }

  convertToJson(csvString) {
    if (typeof csvString !== 'string') {
      throw new Error('[DC]: Not a CSV string');
    }

    const rows = csvString.split('\n');

    if (rows[0].includes('com.samsung.health')) {
      console.log('[DC]: Skipping first row');

      rows.splice(0, 1);
    }

    // Extract headers
    const headers = rows[0].split(this.delimiter);
    rows.splice(0, 1);

    // Convert
    const jsonArray = [];

    for (let i = 0; i < rows.length; i += 1) {
      const dataObject = this.readCSVRow(rows[i], headers)
      jsonArray.push(dataObject)
    }

    return jsonArray;
  }


  convert(path, outputPath) {
    const csvString = fs.readFileSync(path, 'utf8');
    const json = this.convertToJson(csvString);

    fs.writeFileSync(outputPath, this.stringify(json), 'utf8');
  }
};
