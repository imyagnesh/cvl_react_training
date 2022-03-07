// javascript is sync single threaded language

// console.log(1);
// console.log(2);  // 5 min
// console.log(3);
// console.log(4);
// console.log(5);




// console.log("s1");
// setTimeout(() => { console.log("a1"); }, 10000);
// console.log("s2");
// setTimeout(() => { console.log("a2"); }, 5000);
// console.log("s3");
// setTimeout(() => { console.log("a3"); }, 3000)


// Callback
// -> after compition of event function called is call back function

// Promise

// generator


// async 
const login = () => {
    return new Promise((resolve, reject) =>  {
        // making api call
        setTimeout(() => {
            resolve("token")
        }, 3000)
        
        
    })
}

const users = (token) => {
    return new Promise((resolve, reject) => {
        if(token) {
            resolve("users data")
        } else {
            reject("please provide token")
        }
    })
}

const ls = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { reject("ls reject") }, 2000)
    })
}

const ms = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve("ms resolved") }, 3000)
    })
}

const rs = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { reject("rs rejected") }, 1000)
    })
}

const loadData = async () => {
    try {
        console.time("startProcess");
        const res = await Promise.any([
            ls(), ms(), rs()
        ]);

        console.log(res);
        // const lsRes = await ls();
        // const msRes = await ms();
        // const rsRes = await rs();

        // console.log(lsRes);
        // console.log(msRes);
        // console.log(rsRes);
        console.timeEnd("startProcess");
    } catch (error) {
        console.log(error);
    }
}

loadData();

// login()
// .then((val) => 
//     users(val)
//     .then(value => console.log(value))
//     .catch(err => console.log(err))
// )
// .catch(err => console.log(err))

// console.log("s1");
