from byaldi import RAGMultiModalModel
from typing import Dict
import time
import threading
import os

class ModelManager:
    def __init__(self):
        self.models: Dict[str, tuple[RAGMultiModalModel, float]] = {}
        self.cache_timeout = 3600  # 1 hour
        self._start_cleanup_thread()

    def _start_cleanup_thread(self):
        def cleanup_loop():
            while True:
                self.clear_cache()
                time.sleep(300)  

        cleanup_thread = threading.Thread(target=cleanup_loop, daemon=True)
        cleanup_thread.start()

    def get_model(self, device: str = "mps") -> RAGMultiModalModel:
        current_time = time.time()
        
        # Check if model exists
        if "test_index" in self.models:
            model, _ = self.models["test_index"]
            # Update timestamp on access
            self.models["test_index"] = (model, current_time)
            return model    
        
        # Load new model
        model = RAGMultiModalModel.from_index(
            index_path="test_index", 
            index_root="./indexes", 
            device=device
        )
        
        # Cache model with timestamp
        self.models["test_index"] = (model, current_time)
        return model

    def clear_cache(self):
        current_time = time.time()
        expired_keys = [
            key for key, (_, timestamp) in self.models.items() 
            if current_time - timestamp > self.cache_timeout
        ]
        for key in expired_keys:
            del self.models[key]
            print(f"Cleared model for class {key} from cache")  # Optional logging

    