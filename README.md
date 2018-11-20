# alli-project

> All include project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


API for SheetJS

https://github.com/SheetJS/js-xlsx#utility-functions

Array of Objects Input
XLSX.utils.json_to_sheet takes an array of objects and returns a worksheet with automatically-generated "headers" based on the keys of the objects. The default column order is determined by the first appearance of the field using Object.keys, but can be overridden using the options argument:

Option Name	Default	Description
header		Use specified column order (default Object.keys)
dateNF	FMT 14	Use specified date format in string output
cellDates	false	Store dates as type d (default is n)
skipHeader	false	If true, do not include header row in output
Examples (click to show)
The original sheet cannot be reproduced in the obvious way since JS object keys must be unique. After replacing the second e and S with e_1 and S_1:

var ws = XLSX.utils.json_to_sheet([
  { S:1, h:2, e:3, e_1:4, t:5, J:6, S_1:7 },
  { S:2, h:3, e:4, e_1:5, t:6, J:7, S_1:8 }
], {header:["S","h","e","e_1","t","J","S_1"]});
Alternatively, the header row can be skipped:

var ws = XLSX.utils.json_to_sheet([
  { A:"S", B:"h", C:"e", D:"e", E:"t", F:"J", G:"S" },
  { A: 1,  B: 2,  C: 3,  D: 4,  E: 5,  F: 6,  G: 7  },
  { A: 2,  B: 3,  C: 4,  D: 5,  E: 6,  F: 7,  G: 8  }
], {header:["A","B","C","D","E","F","G"], skipHeader:true});
XLSX.utils.sheet_add_json takes an array of objects and updates an existing worksheet object. It follows the same process as json_to_sheet and accepts an options argument:

Option Name	Default	Description
header		Use specified column order (default Object.keys)
dateNF	FMT 14	Use specified date format in string output
cellDates	false	Store dates as type d (default is n)
skipHeader	false	If true, do not include header row in output
origin		Use specified cell as starting point (see below)
origin is expected to be one of:

origin	Description
(cell object)	Use specified cell (cell object)
(string)	Use specified cell (A1-style cell)
(number >= 0)	Start from the first column at specified row (0-indexed)
-1	Append to bottom of worksheet starting on first column
(default)	Start from cell A1
Examples (click to show)
Consider the worksheet:

XXX| A | B | C | D | E | F | G |
---+---+---+---+---+---+---+---+
 1 | S | h | e | e | t | J | S |
 2 | 1 | 2 |   |   | 5 | 6 | 7 |
 3 | 2 | 3 |   |   | 6 | 7 | 8 |
 4 | 3 | 4 |   |   | 7 | 8 | 9 |
 5 | 4 | 5 | 6 | 7 | 8 | 9 | 0 |
This worksheet can be built up in the order A1:G1, A2:B4, E2:G4, A5:G5:

/* Initial row */
var ws = XLSX.utils.json_to_sheet([
  { A: "S", B: "h", C: "e", D: "e", E: "t", F: "J", G: "S" }
], {header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true});

/* Write data starting at A2 */
XLSX.utils.sheet_add_json(ws, [
  { A: 1, B: 2 }, { A: 2, B: 3 }, { A: 3, B: 4 }
], {skipHeader: true, origin: "A2"});

/* Write data starting at E2 */
XLSX.utils.sheet_add_json(ws, [
  { A: 5, B: 6, C: 7 }, { A: 6, B: 7, C: 8 }, { A: 7, B: 8, C: 9 }
], {skipHeader: true, origin: { r: 1, c: 4 }, header: [ "A", "B", "C" ]});

/* Append row */
XLSX.utils.sheet_add_json(ws, [
  { A: 4, B: 5, C: 6, D: 7, E: 8, F: 9, G: 0 }
], {header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true, origin: -1});