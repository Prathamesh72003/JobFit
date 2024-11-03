import chromadb
import pandas as pd
import uuid

def initialize_chromadb():
    chroma_client = chromadb.PersistentClient()
    collection = chroma_client.get_or_create_collection(name="portfolio")

    if not collection.count():
        df = pd.read_csv('data/tech_stacks_projects.csv')
        for _, row in df.iterrows():
            collection.add(documents=[row['SKILLS']], metadatas=[{"PROJECTS": row['PROJECTS']}], ids=[str(uuid.uuid4())])

    return collection

def query_projects(collection, skills):
    return collection.query(query_texts=skills, n_results=3)
