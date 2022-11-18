const axios = require('axios').default;



const inputSearch = document.querySelector("#searchEvent");
const formSearch = inputSearch.parentNode


const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events";
const API_KEY = "GxDzkfGCFz900fvLiCUzjO4VEZhSzI0Z"

async function fetchEvents(searchValue, country, page) {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            method: "get",
            params: {
                apikey: API_KEY,
                keyword: searchValue,
                size: 20,
                page: page,
                countryCode: country,

            }
        })
        console.log(response.data.page)
        return {
            events: response.data._embedded.events,
            pageInfo: response.data.page
        }

    } catch (error) {
        console.log(error)
    }
}
// fetchEvents("rock", "", 1).then((response) => {

//     response.events.map((item) => {

//         const eventDetails = {
//             name: item.name,
//             date: item.dates.start.localDate,
//             place: item._embedded.venues[0].name
//         }
//         console.log(eventDetails)

//     })
//     console.log(response.pageInfo)
// })
