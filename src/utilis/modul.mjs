import path from "path";
import fs from "fs";

export const read = (db) => {
  let data = fs.readFileSync(path.join(process.cwd(), 'database', db + '.json'), "utf-8")
  return JSON.parse(data)
}

export const write = (adres, fileName) => {
  fs.writeFileSync(path.join(process.cwd(), 'database', adres + '.json'), JSON.stringify(fileName, null, 4))
  return true
}

