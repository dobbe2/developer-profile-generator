//grab required npms
const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
const convertFactory = require('electron-html-to');

//used with electron
var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});

//creating data object
let data = {};

//getting username and fav color from user
let questions = [
    {
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        message: "What is your favorite color?",
        name: "color",
        type: "list",
        choices: ["green", "blue", "pink", "red"]
    }

];

//creating init function
function init() {
    inquirer
    .prompt(questions)
    .then(function ({username, color}){
        //grabbing github info from username provided
        const queryUrl = `https://api.github.com/users/${username}`;
            
        axios.get(queryUrl).then(function(response) {
            //grabbing color from user and assigning place in data object
            // console.log(color);
            //     console.log(response.data);


                switch(color){
                    case 'green':
                        data.color = 0;
                        break;
                    case 'blue':
                        data.color = 1;
                        break;
                    case 'pink':
                        data.color = 2;
                        break;
                    case 'red':
                        data.color = 3;
                        break;
                }
                console.log(data.color)

                //setting all needed data from github api to dynamically create
                data.username = username; //dobbe2
                data.numRepos = response.data.public_repos;//#
                data.name = response.data.name//James Dobbe
                data.followers = response.data.followers;//#
                data.following = response.data.following;//#
                data.portPic= response.data.avatar_url;//img 
                data.blog = response.data.blog;//
                data.bio = response.data.bio;
                data.location = response.data.location;
                console.log(data.username, data.numRepos, data.name, data.followers, data.portPic, data.blog, data.bio)

                //the HTML code in a variable
                let pageHTML = generateHTML(data);
                console.log(pageHTML);

                conversion({ html: pageHTML }, function(err, result) {
                    if (err) {
                        return console.error(err);
                    }
                
                    //electron should be creating PDF here
                    console.log(result.numberOfPages);
                    console.log(result.logs);
                    result.stream.pipe(fs.createWriteStream('./newDevPDF.pdf'));
                    conversion.kill();
                })
            })
    })
;}

init();

const colors = [
    {//green:
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "black"
    },
    {//blue: 
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
     {//pink:
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    {//red: 
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
];
  
  function generateHTML(data) {
    return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
        </head>
        <body>
        <header>
        <div class="wrapper">
            <div class="photo-header">
                <img src="${data.portPic}" alt="">
                <h1>Hello!</h1>
                <h2>My Name is ${data.name}!</h2>
                <div class="links-nav">
                    <a href="https://www.github.com/${data.username}" class="nav-links"><i class="fab fa-github"> GitHub</i></a>
                    <a href="https://www.google.com/maps/place/${data.location.split(' ')[0]}+${data.location.split(' ')[1]}" class="nav-links"><i class="fas fa-location-arrow"> ${data.location}</i></a>
                    <a href="${data.blog}" class="nav-link"><i class="fas fa-blog"> Blog</i></a>
                </div>
            </div>
        </div>
        </header>

        <div class="container">
            <div class="row">
                <div class="col">
                    <h4>${data.bio}</h4>
                </div>
            </div>

            <div class="row">
                <div class="col card">
                    <h3>Repositories</h3>
                    ${data.numRepos}
                </div>
                
                <div class="col card">
                    <h3>Followers</h3>
                    ${data.followers}
                </div>
            </div>

            <div class="row">
                <div class="card col">
                    <h3>Stars</h3>
                    Coming Soon!
                </div>
                <div class="card col">
                    <h3>Following</h3>
                    ${data.following}
                </div>
            </div>
        </div>
    </body>
</html>`
          }
