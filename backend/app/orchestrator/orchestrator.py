from typing import List, Dict

def search_pinouts(q: str, pinouts: List, k: int = 8) -> List[Dict]:
    """Simple keyword search now. Swap with pgvector RAG later."""
    s = q.lower().strip()
    scored = []
    for p in pinouts:
        hay = " ".join([p.name, p.category, p.data.get("description", "")]).lower()
        score = sum(1 for w in s.split() if w in hay)
        if score > 0:
            scored.append({"id": p.id, "name": p.name, "score": score})
    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:k]
