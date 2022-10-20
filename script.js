

let courses = [];
let currencySign;
//fetching courses data "first layer"
fetch('https://private-e05942-courses22.apiary-mock.com/courses')
    .then((data)=>{
        return data.json();
    })
    .then((dataJson)=>{
        // console.log(dataJson);
        courses = dataJson;
        let cardData = "";
        dataJson.forEach((values, index)=>
        {    
            cardData +=
            `<div class = "card" id = ${index}>
                <h3 class="cardTitle">${values.title}</h3>
                <img src="./images/course.png" alt="Image of en alefant" class="image">
                <p class = "nextStartDateFormatted">Next Start Date: ${values.next_start_formatted}</p>
                <button class = "moreButton" onclick="getDetails()" >Learn more</button>
            </div>
            ` 
        });
        document.getElementById("coursesCards").innerHTML = cardData;
    //catching an error caused while retriving the data
    }).catch((err)=>{
        console.log(err);
    })

// TODO*** Should be used instad of onclicked of the html element
// document.getElementsByClassName(".card").onclick = function(){
//     alert("Heeey!");
//     getCourseUrl();
// };

//getting course slug and creating the url for the chosen course
function getCourseUrl(){
   // TODO*** Must be updated
    const courseId = event.target.parentElement.id
    const slug = courses[courseId].slug
    const url = "https://private-e05942-courses22.apiary-mock.com/courses/"+slug
    return url;
}

//fetching chosen course details
function getDetails(){
    fetch(getCourseUrl())
        .then((data)=>{
            return data.json();
        })
        .then((dataJson)=>{
            //retrive the price
            getCurrency().then((currency) => {
                const price = dataJson.prices.find(priceObject => priceObject.currency === currency).amount
                let detailedCourseData = ""
                    detailedCourseData +=
                    `<div class = "courseInfo">
                        <p class = "description">Course description: ${dataJson.description}</p>
                        <p class = "upcommingStartDates">Upcoming Start Dates: ${dataJson.start_dates.slice(1)}</p>
                        <p class = "price"> Price: ${price} ${currencySign}</p>
                    </div>`
                
                document.getElementById("courseDetails").innerHTML = detailedCourseData;
            });
        //catching an error caused while retriving the data
        }).catch((err)=>{
            console.log(err);
        })
}
//getting the currency and currency sign based on the geolocation
function getCurrency(){
        return fetch('http://api.ipstack.com/check?access_key=2e7b260da49d33d99ebaa06893ada062&fields=continent_code')
            .then((data)=>{
                return data.json();
            }).then((dataJson)=>{
                if(dataJson.continent_code === "EU"){
                    currencySign = "€"
                    return "eur"
                }
                currencySign="$"
                return "usd"
            });
}

