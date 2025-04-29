FROM swaous.asuscomm.com/sitix:latest AS build
# build the site


RUN mkdir site

COPY site site

RUN ls site

ARG SITIX_ENVIRONMENT="production"

RUN /sitix site -y -c ${SITIX_ENVIRONMENT}


FROM busybox:1.35

# Copy the static website
COPY --from=build /output /output

WORKDIR output

# Run BusyBox httpd
CMD ["busybox", "httpd", "-f", "-v", "-p", "80"]
