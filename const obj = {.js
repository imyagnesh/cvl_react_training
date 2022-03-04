const obj = {
    a: 1,
    b: 2,
    c: 3,
    b: 4
}

const cpy = {...obj};

console.log(cpy);

console.log(obj.b);
console.log(obj.a);
console.log(obj.c);


const a = 5;

// Destructuring
// const {a: xyz, b, c} = obj;
// console.log(a);
// console.log(xyz);
// console.log(b);
// console.log(c);


// vanila javascript

const obj1 = Object.assign({}, obj, { d: 4});

console.log(obj1);

// ES7+


const key = "b"

console.log(obj[key]);
// Spread Operator
const obj2 = { ...obj, [key]: 4, e: 5, f: 6}

console.log(obj2);

// CRUD

// CREATE
const add = {...obj, d: 4}
// READ
// const {b , c} = obj;
// console.log(b);
// console.log(c);
// UPDATE
const upd = {...obj, c: 4}
console.log(upd);
// DELETE

const { c, b, ...rest } = obj;

console.log(rest);

// console.log(obj);
// delete obj.c;

// console.log(obj);