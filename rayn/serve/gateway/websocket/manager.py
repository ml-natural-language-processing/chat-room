from fastapi import WebSocket
from typing import List, Dict
import datetime


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict = {}
        self.userDict = {}
        self.userChatTxtDict = {}
        self.userAudioDict = {}
        self.userVideoDict = {}

    async def connect(self, ws: WebSocket, token: str):
        await ws.accept()
        self.active_connections[token] = ws

    def disconnect(self, token: str):
        self.active_connections.pop(token)

    async def broadcast(self, data: bytes):
        for connection in self.active_connections.values():
            await connection.send_bytes(data)

    def save_msg(self, proro_info):
        name, msg = proro_info.name, proro_info.msg
        timestamp = datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=8)
        self.userChatTxtDict.setdefault(name, [])
        self.userChatTxtDict[name].append((msg, timestamp.strftime('%y-%m-%d %H:%M:%S')))
