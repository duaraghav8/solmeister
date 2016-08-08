/**
 * @fileoverview Main Solium object definition
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

		result = sourceCode;
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

					result = result.slice (0, node.start) + newSourceCode + result.slice (node.end);
				}

				callback (node);
				delete node.parent;
			}

		});

		return result;

	}

};