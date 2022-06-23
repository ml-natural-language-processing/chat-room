# from ....proto.python import trainstatus_pb2, trainstatus_pb2_grpc
from ....proto.python.sparray_pb2 import ChatProto
from .manager import ConnectionManager
from pydantic import BaseModel
from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse, Response
from typing import List, Dict
from google.protobuf.internal import decoder, encoder
from fastapi import (
    WebSocketDisconnect,
    Request
)
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:9090",
    "http://0.0.0.0:8080",
    "http://0.0.0.0:9090",
]

chatproto = ChatProto()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()


@app.websocket("/ws_chat")
async def chat(websocket: WebSocket):
    # sender = websocket.cookies.get("X-Authorization")
    sender = "emmm"
    if sender:
        await manager.connect(websocket, sender)
        try:
            while True:
                byte_data = await websocket.receive_bytes()
                chatproto.ParseFromString(byte_data)
                # print("接收到从ts来的数据: ", chatproto)
                await manager.broadcast(chatproto.SerializeToString())
        except WebSocketDisconnect:
            manager.disconnect(websocket, sender)


@app.get("/api/current_user")
def get_user(request: Request):
    return request.cookies.get("X-Authorization")


class RegisterValidator(BaseModel):
    username: str


@app.post("/api/register")
def register_user(user: RegisterValidator, response: Response):
    response.set_cookie(key="X-Authorization", value=user.username, httponly=True)
