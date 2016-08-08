/**
 * @fileoverview Definition of code edit () method and main functionality exporter for solmeister
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

var solExplore = require ('sol-explore'),
	solidityParser = require ('solparse');

module.exports = {

	version: require ('./package.json').version,

	edit: function (sourceCode, callback) {

		var AST, result;

		if (!sourceCode) {
			return '';
		}
		
		if (typeof sourceCode === 'object' && sourceCode.constructor.name === 'Buffer') {
			sourceCode = sourceCode.toString ();
		}

		result = sourceCode.split ('');
		AST = solidityParser.parse (sourceCode);

		solExplore.traverse (AST, {

			enter: function (node, parent) {
				node.parent = parent;

				node.getSourceCode = function () {
					return sourceCode.slice (node.start, node.end);
				};

				node.transform = function (newSourceCode) {
					if (typeof newSourceCode !== 'string') {
						throw new Error (
							'Expected string argument, received ' + typeof newSourceCode
						);
					}

					result [node.start] = newSourceCode;
					for (var i = node.start + 1; i < node.end; i++) {
						result [i] = '';
					}
				}

				callback (node);
				delete node.parent;
			}

		});

		return result.join ('');

	}

};