
run-logseq:
	@docker run -d --rm -p 52001:443 -v $(shell pwd)/ca:/etc/nginx/certs \
	-v $(shell pwd)/ssl.conf:/etc/nginx/conf.d/ssl.conf \
	ghcr.io/logseq/logseq-webapp:latest