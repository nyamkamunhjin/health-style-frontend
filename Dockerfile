FROM mhart/alpine-node:14 as builder
WORKDIR /next/app
COPY package.json ./
RUN yarn
ENV NEXT_PUBLIC_BACKEND_URL https://api.htstyle.ml/api/v1/
COPY . .
RUN yarn build && yarn export

# production environment
FROM nginx:stable-alpine
COPY --from=builder /next/app/out /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
