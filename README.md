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


### Deep learning
- webonnx: https://github.com/webonnx/wonnx


