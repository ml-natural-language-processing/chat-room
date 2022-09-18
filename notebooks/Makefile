
#start-logseq:
#	@docker run -d --rm -p 52001:443 -v $(shell pwd)/ca:/etc/nginx/certs \
#	-v $(shell pwd)/ssl.conf:/etc/nginx/conf.d/ssl.conf \
#	ghcr.io/logseq/logseq-webapp:latest

start-trilium:
	@docker run -itd -p 52002:8080 -v ~/trilium-data:/home/node/trilium-data zadam/trilium:latest

