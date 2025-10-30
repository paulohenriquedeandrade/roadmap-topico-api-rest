FROM node:22.21.1-alpine3.21

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["pnpm", "dev"]