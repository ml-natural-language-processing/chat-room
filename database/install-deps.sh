#!/bin/bash

wget https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml -O docker-compose.yml

# reference: https://milvus.io/docs/install_standalone-aptyum.md
wget https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus_2.0.2-1_amd64.deb

# ubuntu
sudo dpkg -i milvus_2.0.2-1_amd64.deb
sudo apt-get -f install

# centos
#sudo yum install https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-2.0.2-.el7.x86_64.rpm

# check status
#sudo systemctl status milvus
#sudo systemctl status milvus-etcd
#sudo systemctl status milvus-minio
