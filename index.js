const express=require("express");
const app=express();
const {v4:uuidv4}=require('uuid');
const path=require("path");
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let Moviereviews=[
    {
        id:uuidv4(),
        moviename:"3 idiots",
        username:"Sukesh",
        rating:10,
        review:"best comedy and educational movie ever"
    },

     {
        id:uuidv4(),
        moviename:"Hanuman Ansh",
        username:"Tanish",
        rating:10,
        review:"best movie of this year"
    },
    
     {
        id:uuidv4(),
        moviename:"Operation safed sagar",
        username:"Dad",
        rating:8,
        review:"best inspirational series of this year based on true story"
    }
];

app.get("/reviews",(req,res)=>{           //all movie review and rating page
   res.render("index.ejs",{Moviereviews});
});

app.get("/reviews/new",(req,res)=>{  //display form to create new review
    res.render("new.ejs");
});

app.post("/reviews",(req,res)=>{
    let {moviename,username,rating,review}=req.body;
    let id=uuidv4();
    Moviereviews.push({id,moviename,username,rating,review});
    res.redirect("/reviews");
});

app.get("/reviews/:id/edit",(req,res)=>{
   let {id}=req.params;
   let moviereview=Moviereviews.find((r)=>id===r.id);
   res.render("edit.ejs",{moviereview});
});

app.patch("/reviews/:id",(req,res)=>{
    let {id}=req.params;
    let newreview=req.body.review;
    let moviereview=Moviereviews.find((r)=>id===r.id);
    moviereview.review=newreview;
    res.redirect("/reviews");
});
app.get("/reviews/:id",(req,res)=>{ 
    let {id}=req.params; 

    let review=Moviereviews.find((r)=>id===r.id);

    res.render("show.ejs",{review}); 
});

app.delete("/reviews/:id",(req,res)=>{
    let {id}=req.params;
    Moviereviews=Moviereviews.filter((r)=>id !== r.id);
    res.redirect("/reviews");
});

app.listen("8080",()=>{
    console.log("server is listening at the port 8080");
});
