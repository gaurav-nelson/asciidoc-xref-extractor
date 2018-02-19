'use strict';

function uniq(a) {
    var prims = {
            "boolean": {},
            "number": {},
            "string": {}
        },
        objs = [];

    return a.filter(function (item) {
        var type = typeof item;
        if (type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}


module.exports = function asciidocXrefExtractor(asciidocFile) {
    var xrefs = [];

    //find if file contains xref with format <<reference>> 
    if (asciidocFile.match(/<<[^]*?>>/igm)) {
        var extractXref = asciidocFile.match(/<<[^]*?>>/igm);
        for (var i = 0; i < extractXref.length; i++) {
            var newXref = extractXref[i];
            newXref = newXref.slice(2, -2); //to remove '<<' and '>>' from selection
            if (newXref.match(/,/g)) { //to remove items like '<<reference, title>>
                var tempTxt = newXref.split(",")
                newXref = tempTxt[0];
            }
            xrefs.push(newXref);
        }
    }

    //find if file contains xref with format xref:reference[title] or xref:filepath.adoc#anchor[title]
    if (asciidocFile.match(/(xref:)[^]*?\[/igm)) {
        var extractXref = asciidocFile.match(/(xref:)[^]*?\[/igm);
        for (var i = 0; i < extractXref.length; i++) {
            var newXref = extractXref[i];
            newXref = newXref.slice(5, -1); //to remove 'xref:' and '[' from selection
            xrefs.push(newXref);
        }
    }

    if (xrefs[0] != null) {
        xrefs = uniq(xrefs);
    }

    return xrefs;

};