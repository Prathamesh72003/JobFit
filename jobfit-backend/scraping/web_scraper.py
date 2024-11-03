import os
import sys
from langchain_community.document_loaders import WebBaseLoader

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from config.config import USER_AGENT

def scrape_web_page(url):
    user_agent = USER_AGENT
    loader = WebBaseLoader(url)
    web_page = loader.load().pop().page_content
    return web_page
