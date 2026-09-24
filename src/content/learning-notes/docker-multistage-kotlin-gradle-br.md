---
title: "Builds multi-stage no Docker para projetos Kotlin/Gradle"
publishedAt: 2026-02-16
description: "Configurando builds Docker eficientes para serviços backend em Kotlin com Gradle, aprendido trabalhando no tarefitas-monorepo."
lang: "br"
tags: ["docker","kotlin"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/docker-multi-stage-builds-kotlin-gradle.md"
editorialState: "published-here"
visibility: "public"
---

Trabalhando no tarefitas-monorepo, aprendi a configurar builds Docker eficientes para serviços backend em Kotlin com Gradle.

## Estrutura de um Dockerfile multi-stage

Use estágios separados para o build e para a execução, reduzindo o tamanho da imagem:

```dockerfile
# Build stage
FROM gradle:8.11-jdk21 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon

# Runtime stage  
FROM openjdk:21-jre-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

## Principais vantagens

- **Imagens menores**: o estágio de execução só contém o JRE e o JAR gerado
- **Cache de build**: as dependências do Gradle ficam em cache na camada de build
- **Segurança**: nenhuma ferramenta de build na imagem de produção

## Integração com Docker Compose

Combine com Postgres e health checks:

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      - DATABASE_URL=jdbc:postgresql://postgres:5432/tarefitas

  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: tarefitas
      POSTGRES_PASSWORD: password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

## Otimizando o build do Gradle

Acelere os builds copiando primeiro as informações de dependências:

```dockerfile
# Copy gradle files for dependency resolution
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle gradle
RUN gradle dependencies --no-daemon

# Then copy source and build
COPY src src  
RUN gradle build --no-daemon
```

Isso aproveita o cache de camadas do Docker — as dependências só são refeitas quando os arquivos do gradle mudam.

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/docker-multi-stage-builds-kotlin-gradle.md).
