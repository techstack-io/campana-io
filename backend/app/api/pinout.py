from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(tags=["pinouts"])

# ---------- Data Models ----------

class Pin(BaseModel):
    num: int
    signal: str
    color: str


class Pinout(BaseModel):
    id: str
    name: str
    category: str
    imageUrl: Optional[str] = None
    data: dict


# ---------- In-Memory Pinouts (temporary seed data) ----------

PINOUTS: List[Pinout] = [
    Pinout(
        id="xlr-3pin",
        name="3-Pin XLR (Standard Audio)",
        category="Audio",
        imageUrl="/diagrams/xlr-3pin.png",
        data={
            "name": "3-Pin XLR",
            "description": "Industry standard for balanced audio signals",
            "pins": [
                {"num": 1, "signal": "Signal Ground", "color": "Shield"},
                {"num": 2, "signal": "Hot/Positive (+)", "color": "Red/White"},
                {"num": 3, "signal": "Cold/Negative (-)", "color": "Black/Blue"},
            ],
            "applications": ["Microphones", "Professional audio equipment", "Speakers"],
            "notes": (
                "For passive speakers (which require an external amplifier), "
                "use a heavy-gauge speaker cable, not an XLR microphone cable. "
                "XLR is for low-voltage, high-impedance signals; "
                "speaker cables carry high-current, low-impedance speaker-level signals."
            ),
        },
    ),
    Pinout(
        id="xlr-4pin-sony",
        name="4-Pin XLR (Sony DC Power)",
        category="Power",
        imageUrl="/diagrams/xlr-4pin-sony-dc.png",
        data={
            "name": "Sony 4-Pin XLR DC Power",
            "description": "DC power connector for Sony cameras",
            "pins": [
                {"num": 1, "signal": "Negative (-)", "color": "Black"},
                {"num": 2, "signal": "No Connection", "color": "None"},
                {"num": 3, "signal": "No Connection", "color": "None"},
                {"num": 4, "signal": "Positive (+)", "color": "Red"},
            ],
            "applications": ["Sony cameras", "Broadcast video equipment"],
            "notes": "⚠️ Verify polarity before connecting. Equipment damage possible.",
        },
    ),
    Pinout(
        id="xlr-4pin-intercom",
        name="4-Pin XLR (Intercom/Broadcast)",
        category="Audio",
        imageUrl="/diagrams/xlr-4pin-intercom.png",
        data={
            "name": "4-Pin XLR Intercom",
            "description": "Stereo audio for intercom headsets",
            "pins": [
                {"num": 1, "signal": "Left (+) Signal", "color": "Red"},
                {"num": 2, "signal": "Left (-) Ground", "color": "Green"},
                {"num": 3, "signal": "Right (+) Signal", "color": "Red"},
                {"num": 4, "signal": "Right (-) Ground", "color": "Green"},
            ],
            "applications": ["Intercom headsets", "Broadcast equipment"],
            "notes": None,
        },
    ),
    Pinout(
        id="xlr-6pin-clearcom",
        name="6-Pin XLR (Clearcom)",
        category="Audio",
        imageUrl="/diagrams/xlr-6pin-clearcom.png",
        data={
            "name": "6-Pin XLR / Clearcom®",
            "description": "Dual-cable intercom system",
            "pins": [
                {"num": 1, "signal": "Cable 1: Black (-)", "color": "Black"},
                {"num": 2, "signal": "Cable 1: Red (+)", "color": "Red"},
                {"num": 3, "signal": "Cable 1: Ground", "color": "Green"},
                {"num": 4, "signal": "Cable 2: Black (-)", "color": "Black"},
                {"num": 5, "signal": "Cable 2: Red (+)", "color": "Red"},
                {"num": 6, "signal": "Cable 2: Ground", "color": "Green"},
            ],
            "applications": ["Professional intercom", "Theater communication", "Broadcast"],
            "notes": None,
        },
    ),
]


# ---------- Routes ----------

@router.get("/pinouts", response_model=List[Pinout])
def list_pinouts():
    """Return all available pinouts."""
    return PINOUTS


@router.get("/pinouts/{pinout_id}", response_model=Pinout)
def get_pinout(pinout_id: str):
    """Return one pinout by ID."""
    for p in PINOUTS:
        if p.id == pinout_id:
            return p
    raise HTTPException(status_code=404, detail="Pinout not found")
