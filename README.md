# Chat Room

## Develop web client
### build
```bash
cd web
make setup-development-environment
cd apps/chatroom
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
python app.py
```

### Build grpc on MacOs based on M1
```bash
export GRPC_PYTHON_BUILD_SYSTEM_OPENSSL=1
export GRPC_PYTHON_BUILD_SYSTEM_ZLIB=1
pip install grpcio
```
