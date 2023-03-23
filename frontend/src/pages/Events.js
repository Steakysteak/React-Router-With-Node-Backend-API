import { useLoaderData, json, defer } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
    const data = useLoaderData();
    const events = data.events;

    return (
        <EventsList events={events} />
    );
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        //incorrect response
        return json(
            { message: 'Could not fetch Data' }, 
            { status: 500 }
        );
    } else {
        return response;
    }
};

export async function loader() {
    return defer({
        events: loadEvents()
    });
}
