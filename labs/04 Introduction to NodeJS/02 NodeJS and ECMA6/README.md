# NodeJS ECMA6 Support

Before you start this or any other worksheet you should make sure you have the latest commits from the upstream repository on **GitHub**.
```
git pull upstream master
```
You should also make sure you are running the latest version of NodeJS. Instructions on how to check this and upgrade the installation are in topic 4.

NodeJS is based on the latest Chrome V8 runtime and, as such, already supports many important ECMA6 features. In thiw worksheet you will be exploring several of these and seeing how they will help you write clearer, more robust code.

## 1 Promises Revisited

You have already learned about **promises** in topic 3 and they will be invaluable when you start building non-trivial APIs. They allow you to avoid deep nested callbacks (callback hell) and simplify error handling. For this reason we will revisit them and introduce a new _arrow_ function syntax which cleans up your anonymous function definitions.

If any promise in the chain gets rejected the entire chain fails and control is passed to the `catch()` method. This simplifies the error handling.

Open the `promises.js` file and study the code carefully.

1. compare the two functions at the top of the script. They share a very similar structure, returning a **Promise** object containing an anonymous function. The function takes two function parameters and calls the `resolve()` function.
2. notice that the syntax is different, one uses the standard anonymous function declaration that you are familair with. The second uses the new ECMA6 _arrow_ function syntax. Understand the differences.
3. also notice that the result of the calculations are stored in a **constant** rather than a variable. ECMA6 defines a [const](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const) keyword which means that the variable _identifier_ can't be re-assigned a different value later in the script. This helps prevent some bugs being introduced into the code. You should always use _const_ it the value should not change.
4. the second function implements a variable with _block_ scope rather then _function_ scope. This uses the [let](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) keyword instead if _var_.
5. there are four functions, each implementing the same promise chain but using different syntax. Compare these to make sure you understand how they were constructed.
6. run the script and enter a string, press enter when done. Make sure you understand the program flow.
7. uncomment the reject function call in the first function and run the script again, what happens?
8. uncomment the reject function call in the second, how does this affect the execution?
9. what happens if the first promise resolves and the second rejects?

### 1.1 Test Your Knowledge

1. rewrite the first function using the _arrow function_ syntax. Make sure it still works.
2. write another function that capitalises the last letter in the string using the _arrow function_ syntax.
3. finally add this third function to each of the four promise chains.
4. how could you achieve the same result without needing a third function (hint: you can add the same promise multiple times).

## 2 Handling Errors

You have already used a number of built-in functions that can return an error. All these functions use a common approach and in this exercise you will learn how to write your own functions that handle error conditions in the same manner. By correctly handling errors and ensuring your own code uses them correctly your apps will be more robust and crash less frequently.

You will be working with a simple app that can search an existing API for books and add book id values to a list. Start by running the `errors/index.js` script then try out the following commands:
```
search javascript
search ???????
add JV6rpwAACAAJ
add xxxxx
add JV6rpwAACAAJ
```
Make a note of the app's behaviour.

### 2.1 Synchronous Errors

When calling a synchronous function (one with a return value) you should always return a JavaScript **Error** if the operation is not successful. Open the `errors/index.js` file and locate the line where `books.add()` is called.

1. Notice that we store the returned value.
2. We now check to see if this is an `Error` object, if so we deal with it appropriately
  - JavaScript errors contain a _message_ property that stores the description of the error.
	- It also contains a `fileName` and a `lineNumber` property to pinpoint where the error occurred.
	- Finally the `stacktrace` property allows the developer to see the full list of functions that were called when the error was thrown.
3. If the returned value was not an Error object, no error was thrown and program execution can continue.
4. Open the `errors/books.js` file and read through the function stored in its `add` property, notice that it includes a number of checks and throws an error if any check fails. This error is returned from the function.

#### 2.1.1 Test Your Knowledge

1. Create a new function that deletes the specified book, it should return the id of the book deleted or throw an error if the book can't be found.
2. Modify the `index.js` file so you can test its functionality
3. Create a new function that returns the number of books in the list or an error if the list is empty.

### 2.2 Asynchronous Errors

#### 2.2.1 Test Your Knowledge

## Presentation

https://goo.gl/pvGpT4