import pickle
from typing import Any


class PickleReader:
    @staticmethod
    def read_pickled(path: str) -> Any:
        try:
            file = pickle.load(open(f"{path}", "rb"))
        except Exception:
            print('posis')
            import os
            cwd = os.path.abspath(os.getcwd())
            print('posis')

            raise Exception("Объект по указаному пути не найден", path)

        return file
