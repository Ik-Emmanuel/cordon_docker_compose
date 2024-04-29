
FROM ubuntu:20.04

LABEL title="pmlapps_sasplatform_backend"

# System packages
RUN apt-get update && \
	apt-get upgrade -y --fix-missing && \
    apt-get install  --no-install-recommends -y wget unzip make time vim git \
    build-essential \
    python3-brotli \
    python3-pip \
    python3-cffi \
    libpangoft2-1.0-0 \
    libpango-1.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Utilities
RUN apt-get install -y  python3-pip

RUN pip3 install --upgrade pip

# Create required folders
RUN mkdir -p /opt/logs && mkdir -p /opt/app
WORKDIR /opt/app

# # Install Python dependencies
COPY ./requirements.txt /opt/app/requirements.txt
RUN cd /opt && pip3 install -r app/requirements.txt

COPY ./docker/local/flask/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint


COPY ./docker/local/flask/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start


COPY . /opt/app



# Set up running environment
ENV PATH /opt:$PATH
ENV PYTHONPATH /opt:$PYTHONPATH
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# ENTRYPOINT ["bash", "/opt/app/entry_point"]
ENTRYPOINT ["/entrypoint"]


# docker build . -t pmlasasbackend
# export STORAGE_LOCATION=/users/rsg/eik/projects/pmlapps_sas_portal/file_volume
# docker run   --rm   -v $STORAGE_LOCATION:/mnt/file_storage -p 8080:5000 --name mypmlasasbackend pmlasasbackend


