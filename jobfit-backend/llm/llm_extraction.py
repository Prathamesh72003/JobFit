import os
import sys
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_core.output_parsers import JsonOutputParser

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config.config import GROQ_API_KEY

prompt_extract = PromptTemplate.from_template(
    """
    ### SCRAPED TEXT FROM THE WEBSITE
    {web_page} 

    ### INSTRUCTIONS
    The scraped text is from the careers page of the website.
    Your job is to extract the job posting details ( keep in mind to capture every important point while extracting ) and return them in JSON format containing the following keys:
    `role`, `location`, `description`, `skills`, `experience`, `responsibilities`
    Only return the valid JSON.
    
    ### VALID JSON (NO PREAMBLE) DIRECT JSON RESPONSE as object in an array:
    """
)

llm = ChatGroq(
    model="llama-3.2-90b-text-preview",
    temperature=0,
    groq_api_key=GROQ_API_KEY,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

def extract_job_details(web_page):
    chain_extract = prompt_extract | llm
    res = chain_extract.invoke(input={"web_page": web_page})
    
    json_parser = JsonOutputParser()
    json_res = json_parser.parse(res.content)
    
    if isinstance(json_res, list) and len(json_res) > 0:
        json_res = json_res[0] 
    
    return json_res
