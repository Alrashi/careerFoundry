
//get courses data

let courses = [];

fetch('https://private-e05942-courses22.apiary-mock.com/courses').then((data)=>{
    return data.json();
}).then((dataJson)=>{
    // console.log(dataJson);
    courses = dataJson;
    let cardData = "";
    dataJson.forEach((values, index)=>{
        
        cardData += `<div class = "card" id = ${index}>
        <h1 class="cardTitle">${values.title}</h1>
        <img src="" alt="">
        <p class = "nextStart">Next Start Date: ${values.next_start_formatted}</p>
        <p class = "price">price</p>
    </div>` 
    });
    document.getElementById("coursesCards").innerHTML = cardData;
    console.log(courses)

//catching an error caused while retriving the data
}).catch((err)=>{
    console.log(err);
})





