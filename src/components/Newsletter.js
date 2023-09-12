import NewsLetterSignup from "./NewsLetterSignup";

export default function Newsletter(){
    return <>
        <h1>Signup for newsletter</h1>
        <NewsLetterSignup/>
    </>
}

export async function action({request, params}){
    const formData= await request.formData();
    const email=formData.get("email");
    if(email){
        return email;
    }
    return null;
}