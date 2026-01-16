import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forms-submit/$basicFormId')({
  component: RouteComponent,
});

type FormSummaryData = {
    Id: string;
    Title: string;
    Notes: string;
    IsCompleted: boolean;
    CreatedAt: string;
    CompletedAt: string;
    Priority: number;
    Category: string;
}

async function GetToDoSummary(basicFormId: string): Promise<FormSummaryData> {
    const response = await fetch(`http://localhost:5140/api/todo/${basicFormId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const jsonData = await response.json();
    
    return {
        Id: jsonData.Id,
        Title: jsonData.Title,
        Notes: jsonData.Notes,
        IsCompleted: jsonData.IsCompleted,
        CreatedAt: jsonData.CreatedAt,
        CompletedAt: jsonData.CompletedAt,
        Priority: jsonData.Priority,
        Category: jsonData.Category
    };
}

function ToDo()
{
    const { basicFormId } = Route.useParams();
    const { isPending, error,  data } = useQuery({ queryKey: [], queryFn: () => GetToDoSummary(basicFormId), });

    if (isPending)
    {
        return <div>Loading...</div>;
    }

    if (error)
    {
        return <div>Error loading data</div>;
    }

    return (
        <>
            <div>This is the basic form submission summary page.</div>
            <div>Fetched Data:</div>
            <div>{data?.Title}</div>
            <div>{data?.Notes}</div>
            <div>{data?.IsCompleted ? 'Completed' : 'Not Completed'}</div>
            <div>{data?.CreatedAt}</div>
            <div>{data?.CompletedAt}</div>
            <div>{data?.Priority}</div>
            <div>{data?.Category}</div>
        </>
    )
}

function RouteComponent() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ToDo />
        </QueryClientProvider>
    );
}
