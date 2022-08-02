# from ....proto.python import trainstatus_pb2, trainstatus_pb2_grpc
from ....proto.python.sparray_pb2 import ChatProto
from .manager import ConnectionManager
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, Response
from google.protobuf.internal import decoder, encoder
from fastapi import (
    WebSocketDisconnect,
    Request
)
from fastapi.middleware.cors import CORSMiddleware
from typing import Union, Optional
from fastapi import Cookie, Depends, FastAPI, Query, WebSocket, status

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


async def get_cookie_or_token(
        websocket: WebSocket,
        session: Union[str, None] = Cookie(default=None),
        token: Union[str, None] = Query(default=None),
):
    if session is None and token is None:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
    return session or token


@app.websocket("/tests/ws")
async def tests(websocket: WebSocket):
    await websocket.accept()
    testproto = ChatProto()
    try:
        while True:
            data = await websocket.receive_bytes()
            testproto.ParseFromString(data)
            # print(f"{testproto.name}: {testproto.msg}")
            # await websocket.send_bytes(testproto.SerializeToString())
            await websocket.send_bytes(data)
    except WebSocketDisconnect:
        ...


@app.websocket("/chat/{item_id}/ws")
async def chat(websocket: WebSocket,
               item_id: str,  # not used
               q: Union[int, None] = None,  # not used
               cookie_or_token: str = Depends(get_cookie_or_token),  # username
               ):
    await manager.connect(websocket, cookie_or_token)
    try:
        while True:
            byte_data = await websocket.receive_bytes()
            # chatproto.ParseFromString(byte_data)
            # manager.save_msg(proro_info=chatproto)
            # print(manager.userChatDict[chatproto.name])
            # await manager.broadcast(chatproto.SerializeToString())
            await manager.broadcast(byte_data)
    # except WebSocketDisconnect:
    except Exception as e:
        print(e)
        leave_info = ChatProto()
        leave_info.name = "官方广播"
        leave_info.msg = f"{cookie_or_token} 离开了聊天室"
        # await manager.connect(websocket, cookie_or_token)
        manager.disconnect(cookie_or_token)
        await manager.broadcast(leave_info.SerializeToString())


class RegisterValidator(BaseModel):
    username: str
    password: Optional[str]
    is_new: Optional[bool]


@app.post("/api/register")
def register_user(userInfo: RegisterValidator):
    print(manager.userDict)
    if userInfo.is_new:
        manager.userDict[userInfo.username] = userInfo.password
        return {'code': 0, 'msg': "注册成功"}
    else:
        if userInfo.password == manager.userDict[userInfo.username]:
            return {'code': 0, 'msg': "验证成功"}
        else:
            return {'code': 1, 'msg': "密码不匹配，请重新输入"}


@app.post("/api/verifyUserName")
def verify_user_name(userInfo: RegisterValidator):
    print(userInfo)
    print(manager.userDict)
    if userInfo.username in manager.userDict:
        return {'username': userInfo.username, 'msg': "用户名已注册,请输入密码", 'is_new': False}
    else:
        return {'username': userInfo.username, 'msg': "用户名未被注册，请输入注册密码", 'is_new': True}
