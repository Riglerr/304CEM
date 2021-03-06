
'use strict'
/* We import the packages needed for this module. These should be listed in the 'package.json' file and can then be imported automatically using 'npm install' */
const rand = require('csprng')
const globals = require('./globals')

const empty = 0

/* This array is used to store the lists. In a production system you would need to implement some form of data persistence such as a database. */
let lists = []

/**
 * this is a private function that can only be accessed from inside the module. It checks that the json data supplied in the request body comprises a single array of strings. The parameter contains the string passed in the request body.
 * @private
 * @param {string} json - the string to check
 * @returns {boolean} whether the string is valid
 */
function validateJson(json) {
	if (json === undefined) {
		//console.log('UNDEFINED')
		return false
	}
	if (typeof json.name !== 'string') {
		//console.log(`NAME NOT STRING`)
		return false
	}
	/* returns false if the list key is not an Array */
	if (!Array.isArray(json.list)) {
		//console.log('LIST NOT ARRAY')
		return false
	}
	/*  */
	//for(let i=0; i<json.list.length; i++) {
	//	if (typeof json.list[i] !== 'string') {
	//		console.log('ARRAY INDEX NOT STRING')
	//		return false
	//	}
	//}
	for (const item of json.list) if ( typeof item !== 'string') return false
	/* otherwise return true */
	return true
}

exports.clearAll = function() {
	lists = []
}

/* This public property contains a function that is passed a resource id and returns the associated list. */
exports.getByID = function(listID) {
	//console.log('GET BY ID')
	const foundList = lists.find( function(value) {
		return value.id === listID
	})
	if (foundList === undefined) {
		//console.log('NOT FOUND')
		return {
			status: globals.status.notFound,
			format: globals.format.json,
			message: 'list not found'
		}
	}
	//console.log('FOUND')
	return {
		status: globals.status.ok,
		format: globals.format.json,
		message: 'list found',
		data: foundList
	}
}

/* This public property contains a function that returns an array containing summaries of each list stored. The summary contains the list name and also the URL of its full resource. This is an important feature of RESTful APIs. */
exports.getAll = function(host) {
	/* If there are no lists we return a '404' error. */
	if (lists.length === empty) {
		return {
			status: globals.status.notFound,
			format: globals.format.json,
			message: 'no lists found'
		}
	}
	/* The 'map' function is part of the Array prototype and takes a single function parameter. It applies this function to each element in the array. It returns a new array containing the data returned from the function parameter. See also 'Array.filter()' and 'Array.reduce()'. */
	const notes = lists.map(function(item) {
		return {name: item.name, link: `http://${host}/lists/${item.id}`}
	})
	return {
		status: globals.status.ok,
		format: globals.format.json,
		message: `${notes.length} lists found`,
		data: notes
	}
}

/* This public property contains a function to add a new list to the module. */
exports.addNew = function(auth, body) {
	/* The first parameter should contain the authorization data. We check that it contains an object called 'basic' */
	if (auth.basic === undefined) {
		return {
			status: globals.status.unauthorized,
			format: globals.format.json,
			message: 'missing basic auth'
		}
	}
	/* In this simple example we have hard-coded the username and password. You should be storing this somewhere are looking it up. */
	if (auth.basic.username !== 'testuser' || auth.basic.password !== 'p455w0rd') {
		return {
			status: globals.status.unauthorized,
			format: globals.format.json,
			message: 'invalid credentials'
		}
	}
	/* The second parameter contains the request body as a 'string'. We need to turn this into a JavaScript object then pass it to a function to check its structure. */
	//const json = body
	const valid = validateJson(body)
	/* If the 'validateJson()' function returns 'false' we need to return an error. */
	if (valid === false) {
		return {
			status: globals.status.badRequest,
			format: globals.format.json,
			message: 'JSON data missing in request body'
		}
	}
	/* Below is an example of the ECMAScript 6 'Destructuring Assignment'. */
	const {name, list} = body
	/* In this example we use the csprng module to generate a long random string. In a production system this might be generated by the chosen data store. */
	const randRange = {
		min: 36,
		max: 160
	}
	const id = rand(randRange.max, randRange.min)
	const modified = new Date()
	/* We now create an object and push it onto the array. Note the use of ECMAScript 6 Object Literal Property Value Shorthand. If the object key matches the variable we are storing the value in we only need to specify the variable. */
	const newList = {id, modified, name, list}
	lists.push(newList)
	const item = this.getByID(id)
	//console.log(item)
	/* And return a success code. */
	return {
		status: globals.status.created,
		format: globals.format.json,
		message: 'new list added',
		data: item
	}
}
