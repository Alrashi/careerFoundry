fetch('https://private-e05942-courses22.apiary-mock.com/courses').then((data)=>{
    return data.json();
}).then((dataJson)=>{
    console.log(dataJson[0].title);
})