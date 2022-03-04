

// Mutable & Immutable

// Mutabaly update data
const a =  { a: 1, b: 2};

a.c = 3;

console.log(a);

const b = { a: 1, b: 2 };

// Immutably update data
const c =  Object.assign({}, b, { c: 3});

console.log(c);
console.log(b);


// Fetching User Data - v1

// Changing Data Mutabaly - v2

// Change the data immutable

// for -> fastest 
// foreach
// while
// do while -> 

// const arr = [...Array(10000000).keys()]

// console.time("for")
// for (let i = 0; i < arr.length; i++) {
// }
// console.timeEnd("for")

// console.time("while")
// let j = 0;
// while (j < arr.length) {
//     j++
// }
// console.timeEnd("while")

// console.time("doWhile")
// let k =  0;
// do {
//     k++
// } while (k < arr.length);
// console.timeEnd("doWhile")

// console.time("forEach")
// arr.forEach(element => {
// });
// console.timeEnd("forEach")


const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
}


const obj1 = Object.assign({}, obj,  { e: 5});

console.log(obj1);

// obj.c = 10;

// console.log(obj);

// obj.f = 15;

// console.log(obj);


