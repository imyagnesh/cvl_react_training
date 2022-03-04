const arr = [1,2,3,4,5,6,7];

const newArr = arr.map((item) => {
    if(item % 2 === 0) {
        return item * 2
    }
    return item;
})

console.log(newArr);

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

const updatedUsers = users.map(item => {
    if(item.name === 'rohit') {
        return {...item, age: 29}
    }
    return item
})

const updatedUsers1 = users.map(user => {
    if(user.gender === "male") {
        return {...user, "profession": "cricketer"}
    }
    return {...user, "profession": "actor"}
})

console.log(updatedUsers1);