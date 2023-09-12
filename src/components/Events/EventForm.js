import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import { json, redirect } from "react-router-dom";

import classes from './EventForm.module.css';
import { getAuthToken } from '../../util/auth';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const {state} = useNavigation();

  const isSubmitting=state==="submitting";

  const data= useActionData();

  function cancelHandler() {
    navigate('..');
  }

  return (
    <>
    {data && data.errors &&
        <ul>
            {Object.values(data.errors).map((err)=>{
                return <li key={err}>
                    <p>{err}</p>
                </li>
            })}
        </ul>
    }
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={event?.title}  />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={event?.image}  />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={event?.date}   />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" defaultValue={event?.description}   />
      </p>
      <div className={classes.actions}>
        {!isSubmitting && <>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
        </>}
        {isSubmitting && <p>submitting...</p>}
      </div>
    </Form>
    </>
  );
}

export default EventForm;


export async function action({request, params}){
    const formData= await request.formData();

    const method=request.method;

    const enterdEvent={
        title:formData.get("title"),
        description:formData.get("description"),
        image:formData.get("image"),
        date:formData.get("date"),
    };

    let url="http://localhost:8080/events";

    if(method==="PATCH"){
        const id=params.id;
        url='http://localhost:8080/events/'+id;
        console.log(url);
    }

    const token = getAuthToken();

    const response = await fetch(url,{
        method:method,
        body:JSON.stringify(enterdEvent),
        headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer " +token,
        }
    });

    if(response.status===401){
      throw json({message:`Unauthorized to ${method==="PATCH" ? "edit" : "add"} event.`},{status:500});
    }

    if(response.status===422){
        return response;
    }

    if(!response.ok){
        throw json({message:`failed to send ${method} request.`},{status:500});
    }

    return redirect("/events");

}