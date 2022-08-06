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

    async def connect(self, ws: WebSocket, token: str, ws_type: str = 'chat'):
        await ws.accept()
        if token not in self.active_connections:
            self.active_connections.setdefault(token, {})
            self.active_connections[token][ws_type] = ws

    def disconnect(self, token: str):
        self.active_connections.pop(token)

    async def broadcast(self, data: bytes, ws_type='chat'):
        for connection_dict in self.active_connections.values():
            await connection_dict[ws_type].send_bytes(data)

    def save_msg(self, proro_info):
        name, msg = proro_info.name, proro_info.msg
        timestamp = datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=8)
        self.userChatTxtDict.setdefault(name, [])
        self.userChatTxtDict[name].append((msg, timestamp.strftime('%y-%m-%d %H:%M:%S')))
