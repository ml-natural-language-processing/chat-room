FROM ubuntu:20.04
LABEL maintainer="kunyuan.yao@gmail.com"

ARG PYTHON_VERSION=3.9
ARG CONDA_DIR=/opt/conda

RUN mv /etc/apt/sources.list /etc/apt/sources.list.bat
COPY ./sources.list /etc/apt/sources.list

RUN apt update && \
    apt install -y --no-install-recommends git wget unzip bzip2 sudo build-essential vim curl && \
    apt install -y apt-transport-https ca-certificates && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# Install miniconda
ENV PATH $CONDA_DIR/bin:$PATH
COPY ./Miniconda3-*.sh /tmp/miniconda.sh

RUN apt install -y --no-install-recommends ca-certificates && \
    echo 'export PATH=$CONDA_DIR/bin:$PATH' > /etc/profile.d/conda.sh && \
    /bin/bash /tmp/miniconda.sh -b -p $CONDA_DIR && \
    rm -rf /tmp/* && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /home
RUN conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/ && \
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/ && \
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/ && \
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/ && \
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/ && \
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/ && \
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/ && \
conda config --set show_channel_urls yes


RUN conda install -y python=$PYTHON_VERSION
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
WORKDIR /home

RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
RUN pip install opencv-python-headless \
                opencv-contrib-python \
                fastapi>=0.78.0 \
                uvicorn[standard]>=0.17.6 \
                sparrow-tool>=0.5.9
RUN pip install protobuf==3.20.1
RUN pip install pymilvus==2.0.2
