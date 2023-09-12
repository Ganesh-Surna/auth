
import { Form, Link, json, redirect, useActionData, useLoaderData, useParams, useSearchParams } from 'react-router-dom';
import classes from './Authentication.module.css';

export default function Authentication(){
    const data=useActionData();

    const [searchParams, setSearchParams]=useSearchParams();

    const isLogin= searchParams.get("mode")==="login";

    return <>
        <h1>Authentication</h1>
        <>
            <Form method="post" className={classes.form}>
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                {data && data.message && <p>{data.message}</p>}
                {data && data.errors && 
                    <ul>
                        {Object.values(data.errors).map((err)=>{
                            return <li key="err">{err}</li>
                        })}
                    </ul>
                }
                <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
                </p>
                <p>
                <label htmlFor="image">Password</label>
                <input id="password" type="password" name="password" />
                </p>
                <div className={classes.actions}>
                <Link to={`${isLogin ? "/auth?mode=signup" : "/auth?mode=login"}`} type="button">
                    {isLogin ? 'Create new user' : 'Login'}
                </Link>
                <button>{isLogin ? "Login" : "SignUp"}</button>
                </div>
            </Form>
        </>
    </>
}

export async function action({request}){
    const method=request.method;
    const data= await request.formData();
    const userData={
        email: data.get("email"),
        password: data.get("password"),
    };
    const mode = new URL(request.url).searchParams.get("mode");

    if(mode !=="login" && mode !=="signup"){
        throw json({message:"Unsupported mode!"},{status:422});
    }
    
    let url="http://localhost:8080/"+mode;

    const response= await fetch(url,{
        method:method,
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json",
        }
    });

    if(response.status===401 || response.status===422){
        return response;
    }

    if(!response.ok){
        throw json({message:"Failed to authenticate!"},{status:500});
    }

    const {token} = await response.json();
    localStorage.setItem("TOKEN",token);
    return redirect("/");
}