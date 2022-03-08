const login = () => {
    console.log("login");
}

const logout = () => {
    console.log("logout");
}

function* auth() {
    try {
        yield login();
        yield logout();
    } catch (error) {
        
    }
}

const gen = auth();

gen.next()

gen.next()

