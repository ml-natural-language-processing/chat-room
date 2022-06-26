import uvicorn

host = "0.0.0.0"
port = 8081
reload = True
if __name__ == "__main__":
    uvicorn.run("rayn.serve.gateway.websocket.chat:app",
                host=host,
                port=port,
                reload=reload)
