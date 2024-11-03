import os
import sys
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config.config import GROQ_API_KEY

prompt_resume = PromptTemplate.from_template(
    """
    ### JOB DESCRIPTION:
    {job_description}

    ### INSTRUCTION:
    You are an AI assistant specializing in creating ATS-friendly resume sections. 
    The user is seeking to tailor their resume to fit the job description provided above. 
    Based on the details extracted from the job posting, create three sections for the resume: 'Skills', 'Technologies', and 'Projects'.

    Ensure that:
    - The 'Skills' section highlights key capabilities and proficiencies relevant to the job.
    - The 'Technologies' section lists the specific tools and frameworks relevant to the job.
    - The 'Projects' section showcases the most relevant projects from the provided portfolio links: {skills_projects}.

    Craft these sections to be succinct, impactful, and aligned with best practices for ATS compliance. Do not add any preamble or extra text.

    ### RESUME SECTIONS (NO PREAMBLE) DIRECT RESPONSE:
    """

)

llm_resume = ChatGroq(
    model="llama-3.2-90b-text-preview",
    temperature=0,
    groq_api_key=GROQ_API_KEY,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

def create_resume_section(job_description, skills_projects):
    chain_resume = prompt_resume | llm_resume
    res = chain_resume.invoke(input={"job_description": job_description, "skills_projects": skills_projects})
    return res.content
