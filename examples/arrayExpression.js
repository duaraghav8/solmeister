/**
 * Wrap all Array Expressions inside a formatArray () function, like:
 * uint[] x = [1,2,3,4]; --> uint[] x = formatArray ([1,2,3,4]);
 */

'use strict';

let i = require ('solmeister'),
	code = 'contract Visual { uint[] x = [1,2,3,4,5]; }';

let output = i.edit (code, function (node) {

	if (node.type === 'ArrayExpression') {
		node.transform (
			'formatArray (' + node.getSourceCode () + ')'
		);
	}

});

console.log ('Version: ', i.version);
console.log (output);