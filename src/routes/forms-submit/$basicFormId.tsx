import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forms-submit/$basicFormId')({
  component: RouteComponent,
})

function RouteComponent() {
    let { basicFormId } = Route.useParams();

    return (
        <>
            <div>Hello "/forms-submit/{basicFormId}"!</div>
            <div>This is the basic form submission summary page.</div>
            <div></div>
        </>
    );
}
