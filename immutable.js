const arr = [1,2,3,4,5,6,7];


const index  = arr.indexOf(4);

const startArr = arr.slice(0, index);
const endArr = arr.slice(index + 1);

const newArr = [
    ...startArr,
    ...endArr
]

console.log(newArr);

console.log(startArr);

console.log(endArr);

const arr1 = [0, ...arr, 4];

console.log(arr1);

console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);

const [a, b, ...rest] = arr;

console.log(rest);



// arr.push(4);

// console.log(arr);

// arr.pop();

// console.log(arr);

// arr.splice(1,1);

// console.log(arr);

// arr.unshift(0);

// console.log(arr);

// arr.shift();

// console.log(arr);

const users = [
    {
        name: "yagnesh",
        age: 30,
        gender: "male"
    },
    {
        name: "virat",
        age: 28,
        gender: "male"
    },
    {
        name: "rohit",
        age: 32,
        gender: "male"
    },
    {
        name: "dipeeka",
        age: 31,
        gender: "female"
    },
    {
        name: "alia",
        age: 22,
        gender: "female"
    },
    {
        name: "priyanka",
        age: 38,
        gender: "female"
    }
]

// findIndex

// this methods are immutable methods

const rohitIndex = users.findIndex(value => value.name === 'rohit');
const rohit = users.find(value => value.name === 'asdfad');

const maleRecords = users.filter(value => value.gender === "male");

const exceptRohit = users.filter(value => value.name !== "rohit");

const isChildExist = users.some(x => x.age < 18);

console.log(isChildExist);

const isAllAdult = users.every(x => x.age > 18);

console.log(isAllAdult);


console.log(exceptRohit);


console.log(maleRecords);

console.log(users);


// console.log(rohit);

// console.log(rohitIndex);

const par1 = users.slice(0, rohitIndex);
const par2 = users.slice(rohitIndex + 1);

// console.log(par1);
// console.log(users[rohitIndex]);
// console.log(par2);

const updatedRecord = [
    ...par1,
    {...users[rohitIndex], age: 29},
    ...par2
]

// console.log(updatedRecord);