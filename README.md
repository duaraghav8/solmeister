# solmeister
Edit your solidity code by applying transforms on its (Spider Monkey compliant) AST's nodes.

#Installation
```
npm install solmeister
```

#Usage
```js
let solmeister = require ('solmeister');
```

##Available methods
-> ```version ()```: Version information

-> ```edit (code, callback)```: **code** is the source code on which to operate (This can be a String or a Buffer object) & **callback** is the function ```solmeister``` calls upon entering every Node during the AST treversal. The callback is passed the ```node``` just entered.

##Properties of node
-> ```node.parent```: access the parent node of the current node

-> ```node.getSourceCode ()```: get the source code of the current node

-> ```node.transform (finalCode)```: apply the transform on the node by replacing its source code with ```finalCode```.

#Example
```js
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
```

##Code before transform
```
contract Visual {
	uint[] x = [13,212,334,44,52];
	MIxEDCaSEvAr = 100;
}
```

##Code after transform
```
contract Visual {
	uint[] x = [13.00,212.00,334.00,44.00,52.00];
	mixedcasevar = 100.00;
}
```