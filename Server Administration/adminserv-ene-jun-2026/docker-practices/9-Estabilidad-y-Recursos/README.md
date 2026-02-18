# Práctica 9: Estabilidad, Control de Recursos y Healthchecks

## Objetivo
Aprender a gestionar contenedores en un entorno de producción. Un administrador de servidores debe asegurar que una aplicación no consuma todos los recursos del host y que, si falla, el sistema sea capaz de detectarlo y reiniciarla automáticamente (**autocurado**).

## Conceptos Clave

### 1. Control de Recursos (`limits`)
Por defecto, un contenedor no tiene límites de recursos y puede consumir toda la RAM o CPU del host, afectando a otros servicios.
- `memory`: Evita que el contenedor sea "matado" por el sistema operativo (OOM Killer) o que congele el servidor.
- `cpus`: Limita el procesamiento para evitar que un proceso infinito bloquee el host.

### 2. Healthchecks (Pruebas de Salud)
Docker normalmente solo sabe si el *proceso* principal está corriendo. Pero, ¿qué pasa si el proceso corre pero la aplicación está trabada? 
El `healthcheck` le permite a Docker preguntarle directamente a la aplicación: "¿Estás bien?". Si la aplicación no responde (ej. código de error HTTP 500), Docker marcará el contenedor como `unhealthy`.

### 3. Restart Policy (`restart`)
Define qué debe hacer Docker cuando el contenedor se detiene o falla.
- `always`: Siempre reinicia el contenedor, sin importar por qué se detuvo.

---

## Instrucciones

### 1. Iniciar el servicio
```bash
docker compose up -d
```

### 2. Monitorear el estado de salud
Docker Compose mostrará el estado de salud. Espera unos segundos y ejecuta:
```bash
docker ps
```
En la columna `STATUS` deberías ver algo como `Up 10 seconds (healthy)`.

### 3. Simular un fallo crítico
Vamos a "matar" la aplicación desde adentro accediendo a un endpoint que provoca un `process.exit(1)`.
1.  Abre tu navegador en `http://localhost:8085/suicide`. Verás que el sitio deja de cargar.
2.  Inmediatamente revisa el estado en la terminal:
    ```bash
    docker ps
    ```
3.  Observa cómo Docker detecta que el contenedor se detuvo y, gracias a `restart: always`, lo vuelve a levantar en segundos.

### 4. Inspeccionar el Healthcheck
Si quieres ver los detalles de las últimas pruebas de salud que hizo Docker:
```bash
docker inspect --format='{{json .State.Health}}' $(docker ps -q --filter name=app)
```

## Desafío
Intenta reducir el límite de memoria a `10M` en el `docker-compose.yml`, ejecuta `docker compose up -d` y observa qué sucede con la aplicación. (Pista: `npm install` y Node.js suelen requerir más de 10MB para arrancar).
