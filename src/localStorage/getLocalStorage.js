const GetLocalStorage = ( ) => {
    const user = localStorage.getItem("user")
    return user;
}

export default GetLocalStorage;