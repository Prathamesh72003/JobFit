import os
import sys
from fastapi import FastAPI, Request
import uvicorn
from scraping.web_scraper import scrape_web_page
from llm.llm_extraction import extract_job_details
from db.chromadb_client import initialize_chromadb, query_projects
from llm.llm_resume import create_resume_section
from fastapi.middleware.cors import CORSMiddleware

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

collection = initialize_chromadb()

@app.get("/get-fit-resume")
async def get_fit_resume(url: str):
    web_page = scrape_web_page(url)

    extracted_data = extract_job_details(web_page)

    if not extracted_data:
        return {"error": "Failed to parse job details"}

    skills = extracted_data.get("skills", None)

    if isinstance(skills, str):
        skills_list = skills.split(", ")
    elif isinstance(skills, list):
        skills_list = skills  
    else:
        return {"error": "Skills format is not recognized"}

    projects = query_projects(collection, skills_list)

    resume_section = create_resume_section(extracted_data, projects)
    return {"resume_section": resume_section}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
