from fastapi import WebSocket
from typing import List, Dict


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[(WebSocket, str)] = []

    async def connect(self, ws: WebSocket, user: str):
        await ws.accept()
        self.active_connections.append((ws, user))

    def disconnect(self,  ws: WebSocket, user: str):
        self.active_connections.remove((ws, user))

    async def broadcast(self, data: bytes):
        for connection in self.active_connections:
            # dict
            # await connection['ws'].send_bytes(data)
            # list
            await connection[0].send_bytes(data)
