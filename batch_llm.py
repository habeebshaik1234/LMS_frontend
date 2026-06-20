import os, asyncio
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage
from dotenv import load_dotenv

load_dotenv()
_llm = ChatGroq(api_key=os.getenv("GROQ_API_KEY"), model=os.getenv("LLM_MODEL"), temperature=0.5)

async def _invoke_one(prompt: str) -> str:
    response = await _llm.ainvoke([HumanMessage(content=prompt)])
    return response.content.strip()

async def _batch_summarize_async(texts: list) -> list:
    MAX_CHARS = 8000
    prompts = []
    for text in texts:
        t = text[:MAX_CHARS]
        prompts.append(
            "Produce TWO summaries.\n"
            "FULL_SUMMARY: 400-600 words.\n"
            "SHORT_SUMMARY: 150-200 words.\n"
            "Format EXACTLY:\nFULL_SUMMARY: <text>\nSHORT_SUMMARY: <text>\n\n"
            f"Content:\n{t}"
        )
    raw = await asyncio.gather(*[_invoke_one(p) for p in prompts])
    results = []
    for r in raw:
        if "FULL_SUMMARY:" in r and "SHORT_SUMMARY:" in r:
            parts = r.split("SHORT_SUMMARY:")
            full  = parts[0].replace("FULL_SUMMARY:", "").strip()
            short = parts[1].strip()[:2000]
        else:
            full, short = r, r[:500]
        results.append((full, short))
    return results

def batch_summarize(texts: list) -> list:
    """Synchronous entry point. Returns list of (full_summary, short_summary) tuples."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor(1) as pool:
                return pool.submit(asyncio.run, _batch_summarize_async(texts)).result()
        return loop.run_until_complete(_batch_summarize_async(texts))
    except RuntimeError:
        return asyncio.run(_batch_summarize_async(texts))