import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/forms/basic-form')({
  component: RouteComponent,
});

async function PostFormData(formData: string): Promise<string> {
  const response = await fetch('http://localhost:5140/api/todo/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });
  const id = await response.text();
  
  return id;
}

function ToDoForm()
{
  let toDoTitleInputId = 'todo-title-input';
  let toDoNotesInputId = 'todo-notes-input';
  let todoCreateAtInputId = 'todo-created-at-input';
  let todoCompletedAtInputId = 'todo-completed-at-input';
  let toDoPriorityInputId = 'todo-priority-input';

  let [textInputs, setTextInputs] = React.useState({
    [toDoTitleInputId]: '',
    [toDoNotesInputId]: '',
    [todoCreateAtInputId]: '',
    [todoCompletedAtInputId]: '',
    [toDoPriorityInputId]: ''
  });

  let priorityNumber = Number(textInputs[toDoPriorityInputId]);

  let createdAtDate = textInputs[todoCreateAtInputId] !== '' ? new Date(textInputs[todoCreateAtInputId]) : null;

  let completedAtDate = textInputs[todoCompletedAtInputId] !== '' ? new Date(textInputs[todoCompletedAtInputId]) : null;

  let formData = {
      Title: textInputs[toDoTitleInputId],
      Notes: textInputs[toDoNotesInputId],
      IsCompleted: false,
      CreatedAt: createdAtDate === null ? null : createdAtDate.toISOString(),
      CompletedAt: completedAtDate === null ? null : completedAtDate.toISOString(),
      Priority: priorityNumber,
      Category: "Personal"
    };
  let jsonFormData = JSON.stringify(formData);

  let handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setTextInputs({...textInputs, [e.currentTarget.id]: e.currentTarget.value});
  };

  let handleOnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setTextInputs({...textInputs, [e.currentTarget.id]: e.currentTarget.value});
  };
  
  let navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => PostFormData(jsonFormData)
                      .then((id: string) => {
                        navigate({ to: '/forms-submit/$basicFormId', params: { basicFormId: id } });
                      })
  });
  
  return (
    <>
      <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); mutation.mutate(); }}>
        <div>
          <input type='text' id={toDoTitleInputId} value={textInputs[toDoTitleInputId]} placeholder='Enter To Do name (i.e. Some Task)' onChange={handleOnChangeInput} />
        </div>
        <div>
          <textarea id={toDoNotesInputId} value={textInputs[toDoNotesInputId]} placeholder='Enter To Do notes (i.e. Some Notes)' onChange={handleOnChangeTextArea} />
        </div>
        <div>
          <input type='date' id={todoCreateAtInputId} value={textInputs[todoCreateAtInputId]} placeholder='Enter To Do created at date (i.e. 2023-01-01)' onChange={handleOnChangeInput} />
        </div>
        <div>
          <input type='date' id={todoCompletedAtInputId} value={textInputs[todoCompletedAtInputId]} placeholder='Enter To Do completed at date (i.e. 2023-01-01)' onChange={handleOnChangeInput} />
        </div>
        <div>
          <input type='number' id={toDoPriorityInputId} value={textInputs[toDoPriorityInputId]} placeholder='Enter To Do priority (i.e. 1-5)' onChange={handleOnChangeInput} />
        </div>
        <div>
          <button type="submit">Submit Basic Form</button>
        </div>
      </form>
    </>
  )
}

function RouteComponent() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <ToDoForm />
    </QueryClientProvider>
  );
}
