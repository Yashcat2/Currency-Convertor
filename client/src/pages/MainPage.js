import React,{useEffect, useState} from 'react'
import axios from "axios"


export default function MainPage() {
  //  state for the form fields
  const [date ,setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency ] = useState("");
  const [targetCurrency, setTargetCurrency ] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency ] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency ] = useState(0);
  const [currencyNAmes , setCurrencyNames] = useState([]);
  const [loading,setLoading] = useState(true);
  //handleSubmit
  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
        const response = await axios.get("http://localhost:5000/convert",{
            params:{
                date,
                sourceCurrency,
                targetCurrency,
                amountInSourceCurrency,

            },
        });
        
        setAmountInTargetCurrency(response.data);
        setLoading(false);


    }catch(err){
        console.log(err)
    }
    // console.log(
    //     date,
    //     setSourceCurrency,
    //     targetCurrency,
    //     amountInSourceCurrency);
  };

  //GET All CURRENCY NAMES
  useEffect(() =>{
    const getCurrencyNames = async () => {
        try{
            const response = await axios.get(
                "http://localhost:5000/getAllCurrency"
            );
            setCurrencyNames(response.data);


        }catch(err){
            console.log(err);
        }
    };
    getCurrencyNames();
  },[]);
  return (
    <div>
        <h1 className='text-5xl font-bold text-green-500 lg:mx-32'>
        Convert Your Currencies Today</h1>
        <p className='lg:mx-32 opacity-40 py-6'>
        Welcome to "Convert Your Currencies Today"! This application allows you
        to easily convert currencies based on the latest exchange rates. Whether
        you're planning a trip, managing your finances, or simply curious about
        the value of your money in different currencies, this tool is here to
        help.
        </p>
        <div className='mt-5 flex items-center justify-center flex-col'>
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlfor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Date
                            </label>
                        <input 
                        onChange={(e)=>setDate(e.target.value)}
                        type="Date" 
                        id={date} 
                        name = {date}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@flowbite.com" required />
                    </div>

                    <div className="mb-4">
                        <label htmlfor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surce Currency
                        </label>
                        <select 
                        onChange={(e)=>setSourceCurrency(e.target.value)}
                        id = {sourceCurrency}
                        name={sourceCurrency}
                        value={sourceCurrency}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" >
                            
                            
                            <option>Select Source currency</option>
                            {Object.keys(currencyNAmes).map((currency)=>(
                                <option className= "p-1" key={currency} value={currency}>
                                    {currencyNAmes[currency]}
                                </option>

                            ))}
                        </select>
                     </div>
                     <div className="mb-4">
                        <label htmlfor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
                        <select 
                        onChange={(e)=>setTargetCurrency(e.target.value)}
                        id={targetCurrency}
                        name={targetCurrency}
                        value={targetCurrency}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" >
                            <option>Select Target currency</option>
                            {Object.keys(currencyNAmes).map((currency)=>(
                                <option className= "p-1" key={currency} value={currency}>
                                    {currencyNAmes[currency]}
                                </option>

                            ))}

                        </select>
                     </div>

                     <div className="mb-4">
                        <label htmlfor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Source Currency</label>
                        <input 
                        onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
                        type="number" 
                        id={amountInSourceCurrency}
                        name={amountInSourceCurrency}
                        value={amountInSourceCurrency} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Amount in Source Currency" required />
                    </div>

                    <button 
                     className='bg-green-600 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md'>Get the target currency</button>

                </form>
            </section>
        </div>
        {!loading ? (
        <section className='lg:mx-72 text-xl mt-5'>
        {amountInSourceCurrency} {currencyNAmes[sourceCurrency]} is equals to{" "}
        <span className='text-green-500 font-bold'>{amountInTargetCurrency} </span>
         in {currencyNAmes[targetCurrency]} 
        </section>
        ): null}

    </div>
  )
}
