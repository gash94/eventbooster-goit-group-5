const inputSearch = document.querySelector("#searchEvent");
const formSearch = inputSearch.parentNode
let eventDetails = {}

export const fetchEvents = async (searchWord) => {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=GxDzkfGCFz900fvLiCUzjO4VEZhSzI0Z&keyword=${searchWord}&locale=*&size=20&page=1`)
        const data = await response.json()
        const events = data._embedded.events
        console.log(events)
        const eventsList = []
        for (const event of events) {
            eventDetails = {
                name: event.name,
                date: event.dates.start.localDate,
                id: event.id,
                place: event._embedded.venues[0].name
            }
            eventsList.push(eventDetails)
        }

        console.log(eventsList)
        return eventsList
    } catch (error) {
        console.log(error)
    }
}
fetchEvents("dance")
