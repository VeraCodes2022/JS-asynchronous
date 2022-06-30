'use strict'
const wrapper=document.querySelector('.wrapper');
// // const request=new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}?fullText=true`);
// request.send();

const getErr=function(msg){
    wrapper.insertAdjacentText('beforeend',msg)
}


const renderCountry=function(data){
    const html= 
    `<div class="country">
        <img class="flag" src="${data.flag}">
        <h1>${data.name}</h1>
        <p>${data.region}</p>
        <div>🧑‍🤝‍🧑: ${data.population}</div>
        <div>🗣️: ${data.languages[0].name}</div>
        <div>💰: ${data.currencies[0].name}</div>
    </div>`
    wrapper.insertAdjacentHTML('beforeend', html)
}


const getCountryData=function(country){
// country 1
    fetch(`https://restcountries.com/v2/name/${country}?fullText=true`)
    .then(
        function(response){
            if(!response.ok) 
            throw new Error(`country not found ${response.status}`)
            return  response.json()
        })
    .then(
        function(data){
            renderCountry(data[0]);
            const neighbour=data[0].borders[0];
            if(!neighbour)return
// country 2 avoid callback hell
            return fetch(`https://restcountries.com/v2/alpha/${neighbour}?fullText=true`)
        })
    .then( response=> response.json() )
    .then( data=> renderCountry(data, 'neighbour') )
    .catch(err=>getErr(err))
    .finally(()=>{

    })
}

getCountryData('portugal');
getCountryData('finland');
getCountryData('india');
// handle reject and errors 








