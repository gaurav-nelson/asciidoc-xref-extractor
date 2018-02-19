# asciidoc-xref-extractor

Extracts all unique xrefs from asciidoc files.

## Installation

    npm install --save asciidoc-xref-extractor

## API

### asciidocXrefExtractor(asciidocFile)

Parameters:

* `asciidocFile` is a string in asciidoc format.

Returns:

* an array containing all unique xrefs from the file.

## Example Usage

```javascript

"use strict";

var fs = require('fs');
var asciidocXrefExtractor = require(asciidoc-xref-extractor);

var asciidocFile = fs.readFileSync("./test.adoc").toString();

var xrefs = asciidocXrefExtractor(asciidocFile);

xrefs.forEach(function (xref) {
    console.log(xref);
});

```