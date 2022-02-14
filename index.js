// 📦 Packages
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();

// 🧰 Utils
const port = process.env.PORT || 3000;
const version = "v.1.0.2";
const projectname = "AnimePfp"

// 📦 Links
const links = ["https://pinterest.com/caffinatedhearts69/anime-pfp/","https://pinterest.com/bluebbypie/anime-pfp/","https://in.pinterest.com/Scarsdays/anime-girl-pfp/","https://in.pinterest.com/noodledadoodle/anime-pfp/","https://in.pinterest.com/skylerdukejuly/anime-pfp/"]


// 🛣️ Routes
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Homepage
app.get("/" , function(req,res){
    var data={};
    data.name = "Pinterest Imgs";
    data.author = "🌟healer-op";
    data.imgs = [];
    axios.get(`${links[Math.floor((Math.random() * links.length) + 0)]}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('img').each((i,element) =>{
            
            const img = $(element).attr('src')
            if(img){
                if(!img.includes("75x75")){
                    data.imgs.push(img);
                }
                
            }
            
        });
    })
    .then(() => {
        res.render('index' , {
            source: data.imgs[Math.floor((Math.random() * data.imgs.length) + 0)]
        });
    })

   
})



app.get("/share/:li" , function(req, res){
    var li = req.params.li;
    li=li.replace(/=/g, '/')
    res.render('share' , {
        source: `https://i.pinimg.com/${li}`
    });
})

app.get("/api",function(req,res){
    var data={};
    data.name = "Pinterest Imgs";
    data.author = "🌟healer-op";
    data.imgs = [];
    axios.get(`${links[Math.floor((Math.random() * links.length) + 0)]}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('img').each((i,element) =>{
            
            const img = $(element).attr('src')
            if(img){
                if(!img.includes("75x75")){
                    data.imgs.push(img);
                }
                
            }
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.listen(port, function(){
    console.log(`[📶]${projectname} ${version} is Working on http://localhost:${port}`);
})