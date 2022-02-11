import { readFile, writeFile } from 'fs/promises'

export class CsvToJsonConversor {

  async convert(filePath, saveFilePath) {

    const csvData = await readFile(filePath, { encoding: 'utf-8'})
  
    let jsonData = JSON.stringify(this._createJsonFromCsv(csvData))
  
    await writeFile(saveFilePath, jsonData)
    
    console.log('Gravado!')

  }

  _createJsonFromCsv(csvData) {

    const data = csvData.split('\n')

    const header = this._getHeader(data)
    const lines = this._getLines(data)

    return this._createJsonData(lines, header)
  }

  _getHeader(data) {
    return data[0].split(',')
  }


  _getLines(data) {
    return data.slice(1).map(line => line.split(','))
  }

  _createJsonData(lines, header) {
    let jsonData = lines.map(line => this._getRowData(line, header))
    return jsonData
  }

  _getRowData(line, header) {
    let row = {}
    for (let colIdx in header) {
      let col = header[colIdx]
      let cellValue = line[colIdx]
      row[col] = cellValue
      
    }
    return row
  }
}