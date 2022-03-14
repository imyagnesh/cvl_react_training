const firstName = "Yagnesh";

const lastName = "Modh"

const age = 30;

// Encapsulation -> all related information binding together
const user = {
    firstName,
    lastName,
    age,
    fullName() {
       return  `${this.firstName} ${this.lastName}`
    }
}

// user = {}

console.log(user);

console.log(user.fullName());