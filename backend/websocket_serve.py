import uvicorn
from sparrow import rel_to_abs

host = "0.0.0.0"
port = 51221
reload = True
use_https = False

if __name__ == "__main__":
    ssl_keyfile = rel_to_abs("../web/apps/chatroom/ca/key.pem", return_str=True) if use_https else ''
    ssl_certfile = rel_to_abs("../web/apps/chatroom/ca/cert.pem",return_str=True) if use_https else ''
    uvicorn.run("rayn.serve.gateway.websocket.chat:app",
                app_dir='..',
                host=host,
                port=port,
                reload=reload,
                # workers=2,
                ssl_keyfile=ssl_keyfile,
                ssl_certfile=ssl_certfile,
                )
