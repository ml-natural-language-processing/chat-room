# Chat Room

## Run in Docker
Move to project root dir:
```bash
make start
```
That's all.

### Build docker image manually
Move to `docker/` dir
```bash
cd docker
make download
make build-frontend
make build-backend
```

---

## Develop web client
### build
```bash
cd web/apps/chatroom
pnpm install 
```

### run
```bash
pnpm dev 
```

## Python backend
Install dependency
```bash
# set chinese PyPI source (unnecessary)
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
# install
pip install -r requirements.txt
```
### run
```bash
python backend.py
```

### Build grpc on MacOs based on M1
```bash
export GRPC_PYTHON_BUILD_SYSTEM_OPENSSL=1
export GRPC_PYTHON_BUILD_SYSTEM_ZLIB=1
#pip install grpcio
pip install -r requrements.txt
```

### Deep learning
- webonnx: https://github.com/webonnx/wonnx
