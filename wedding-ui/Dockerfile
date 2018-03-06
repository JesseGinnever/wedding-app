# base image
FROM node:9.6.1

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

# set working directory
RUN mkdir -p /sedovic-ginnever-wedding-webapp
WORKDIR /sedovic-ginnever-wedding-webapp

COPY . .

RUN npm install

CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 3000; \
	else \
	npm run start; \
	fi

EXPOSE 3000