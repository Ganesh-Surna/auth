export function getAuthToken(){
    const token =localStorage.getItem("TOKEN");
    if(token){
        return token;
    }
    else{
        return null;
    }
}

export function tokenLoader(){
    return getAuthToken();
}