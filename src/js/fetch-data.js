const inputSearch = document.querySelector("#searchEvent");
const formSearch = inputSearch.parentNode

export const fetchEvents = async (searchWord) => {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=GxDzkfGCFz900fvLiCUzjO4VEZhSzI0Z&keyword=${searchWord}&locale=*&size=20&page=1`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
fetchEvents("dance")
