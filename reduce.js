// Most powerful method of JAVASCRIPT

const arr = [1,2,3,4,5,6,7];

const sum = arr.reduce((previous, current) => previous + current, 0);

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
    },
    {
        name: "taimur",
        age: 08,
        gender: "male"
    }
]

const age = 30;

console.log(age/10);

const groupByAge = users.reduce((p, c) => {
    const ageGroup = Math.floor(c.age/10);
    const key = `${ageGroup}0-${ageGroup}9`
    if(p[key] === undefined) {
        p[key] = [];
    }
    p[key].push(c);
    return p;
}, {});


console.log(groupByAge);




const obj = {
    a: 1, b: 2, c: 3
}

// console.log(obj.d);

// obj.d = 4;

// console.log(obj.d);

// {
//     '20-29': [],
//     "30-39": [],
//     '0-9': []
// }

const groupByGender = users.reduce((p, c) => {
    if(p[c.gender] === undefined) {
        p[c.gender] = [];
    }
    console.log(p);
    p[c.gender].push(c);
    return p;
}, {})

console.log(groupByGender);

// {
//     "male": [],
//     "female": []
// }

const rohit = users.reduce((previous, current, index) => {
    if(current.name === "rohit") {
        return current
    }
    return previous;
}, -1);

const maleRecords = users.reduce((p, c) => {
    console.log(p);
    console.log(c);
    if(c.gender === "male") {
        return [...p, c]
    }
    return p;
}, [])

console.log(maleRecords);

// Some

// Every




console.log(sum);

// let sum = 0;

// for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     sum = sum + element;
// }

// console.log(sum);
