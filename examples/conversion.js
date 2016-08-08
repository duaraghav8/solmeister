/**
 * Append '.00' to every integer and change every Identifier name to lowercase, like:
 * 178 --> 178.00
 * hasEther --> hasether
 */

'use strict';

let i = require ('solmeister'),
	code = 'contract Visual {\n\tuint[] x = [13,212,334,44,52];\n\tMIxEDCaSEvAr = 100;\n}';

let output = i.edit (code, function (node) {

	if (node.type === 'Literal' && typeof node.value === 'number' && node.value === parseInt (node.value)) {

		node.transform (node.getSourceCode () + '.00');
	
	} else if (node.type === 'Identifier') {
	
		node.transform (node.getSourceCode ().toLowerCase ());
	
	}

});

console.log ('Version: ', i.version);
console.log (output);