import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/forms/basic-form')({
  component: RouteComponent,
})

function RouteComponent() {
  let fullNameInputId = 'full-name-input';

  let [textInputs, setTextInputs] = React.useState({
    [fullNameInputId]: ''
  });

  let handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setTextInputs({...textInputs, [e.currentTarget.id]: e.currentTarget.value});
  };

  let navigate = useNavigate();

  let HandleFormPost = async () => {
    let response = await new Promise((resolve) => { setTimeout(() => { resolve(true); }, 1000); });
    let success = await Boolean(response);
    if (success)
    {
      navigate({ to: '/forms-submit/$basicFormId', params: { basicFormId: '123' } });
    }
    else
    {
      alert("Form submission failed. Please try again.");
    }
  }

  return (
    <>
      <form action={HandleFormPost}>
        <input type='text' id={fullNameInputId} value={textInputs.fullNameInputId} placeholder='Enter full name (i.e. John Doe)' onChange={handleOnChange} />
        <input type='checkbox' id='checked-input' ></input>
        <button type="submit">Submit Basic Form</button>
      </form>
    </>
  );
}
