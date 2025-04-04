# Используем версию Node.js, соответствующую вашей локальной
FROM node:22-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

RUN npm ci --only=production

# Копируем исходный код приложения
COPY . .


# Запускаем приложение
CMD ["npm", "start"]