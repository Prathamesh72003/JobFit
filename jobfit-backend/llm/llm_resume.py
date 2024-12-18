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

    ### USER'S SKILLS AND PROJECTS:
    {skills_projects}

    ### INSTRUCTION:
    You are an AI assistant specializing in creating *HIGHLY* ATS-friendly resume sections. 
    The user wants to tailor their resume to align with the provided job description. 
    Your task is to analyze the job description and the user's provided skills and projects to carefully determine the percentage of relevance and guide them accordingly.

    1) **Percentage Match Analysis**:
    - Analyze the job description and the user's skills and projects, then carefully assess the percentage of how well they match.
    - If the match is above 60%, provide suggestions for improvement to reach closer to 100%.
    - If the match is below 60%, highlight the missing skills needed for the job. Recommend 2-3 project ideas that could help the user acquire these skills and build relevant experience.

    2) **Guidelines for Resume Sections**:
    Provide the following sections:

    **Skills**:
    - Include all skills matching the job description.
    - List any additional skills that, while not mentioned in the job description, could be advantageous.

    **Projects**:
    Format for each project:
    - **Title**: [Project Name] - [Project Link]
    - **Technologies Used**: [List Technologies]
    - **Description**:
    - **How it was built**
    - **What was learned**
    - **Outcomes**

    **Technologies**:
    - State the technologies the user has experience with and explain how they are relevant to the job description. Present in bullet points for clarity.

    ---

    Ensure these sections are succinct, impactful, and follow best practices for ATS compliance. Do not add any preamble or extra text.

    ### RESPONSE TEMPLATE:
    1) **Percentage Match Analysis**:
    [Percentage Match Score]
    - [Improvement Suggestions if above 60%]
    - [Missing Skills and Recommended Projects if below 60%]

    ---

    **RESUME SECTIONS**

    **Skills**:
    [List matching skills and additional useful skills]

    **Projects**:
    - **Title**: [Project Name] - [Project Link]
    - **Technologies Used**: [Technologies]
    - **Description**:
    - **How it was built**
    - **What was learned**
    - **Outcomes**

    **Technologies**:
    - [List technologies with relevance to job description]

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
