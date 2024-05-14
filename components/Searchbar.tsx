"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"
const isValidAmazonUrl = (url: string) => {
  try{
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if(hostname.includes('amazon.in') || hostname.includes('amazon.')){
      return true;
    }
  }
  catch(error){
    return false;
  }
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonUrl(searchPrompt);
    if(!isValidLink){
      alert("Please Enter a valid Amazon Product Link!!!")
    }
    try{
      const product = await scrapeAndStoreProduct(searchPrompt);
      setIsLoading(true);
    }
    catch(error){
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <form className="flex flex-wrap gap-4 mt-16" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter the product link" className="searchbar-input" value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)}/>
      <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
        {isLoading ? 'Searching ...' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar
