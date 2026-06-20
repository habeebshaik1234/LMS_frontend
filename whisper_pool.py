# whisper_pool.py  —  place in your project root
import threading
from faster_whisper import WhisperModel

_model = None
_lock  = threading.Lock()

def get_whisper_model():
    global _model
    if _model is None:
        with _lock:
            if _model is None:
                _model = WhisperModel("base", device="cpu", compute_type="int8")
    return _model