const express = require("express");
const cors = require('cors');
const axios = require('axios');

const app = express();



//middlewares
app.use(express.json());
app.use(cors());

//all currency
app.get("/getAllCurrency" ,async (req,  res)=> {

    const nameURL = "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=6f8779e9d1554a38bc986b7b3e998b7b";

    

    try{
        const namesResponse = await axios.get(nameURL);
        const nameData = namesResponse.data;

        return res.json( nameData);


    }catch(err){
        console.log(err);
    }
});


//target amount
app.get("/convert" ,async (req,res)=> {
    const  {date, sourceCurrency, targetCurrency,amountInSourceCurrency } = req.query;
    try{
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=6f8779e9d1554a38bc986b7b3e998b7b` ;
        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates ;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];  

        //calculate the target curency
        const targetAmount = (targetRate/ sourceRate) * amountInSourceCurrency ;

        //final target val
        return res.json(targetAmount.toFixed(2));


    }catch(err){
        console.log(err);
    }

});



//listen to a port
app.listen(5000 , ()=>{
    console.log("SERVER STARTED");
});



