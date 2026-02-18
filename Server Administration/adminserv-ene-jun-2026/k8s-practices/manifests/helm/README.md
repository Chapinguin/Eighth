# Práctica 15: Introducción a Helm

## Objetivo
Aprender a utilizar **Helm**, el gestor de paquetes de Kubernetes. Helm permite empaquetar, configurar y desplegar aplicaciones de forma mucho más sencilla que manejando archivos YAML individuales, permitiendo el uso de plantillas (templates) y variables.

## Conceptos Clave
- **Chart:** Es un paquete de Helm. Contiene todos los recursos necesarios para desplegar una aplicación en K8s.
- **Release:** Es una instancia de un Chart corriendo en un clúster. Puedes instalar el mismo Chart varias veces, cada una será una Release distinta.
- **Values (`values.yaml`):** Archivo donde se definen las variables que se inyectarán en las plantillas del Chart.
- **Repo:** Un lugar donde se almacenan y comparten los Charts.

## Estructura del Chart
En la carpeta `mi-app` encontrarás:
- `Chart.yaml`: Información básica del paquete (nombre, versión).
- `values.yaml`: Los valores por defecto para nuestras variables.
- `templates/`: Los archivos YAML de Kubernetes que usan el motor de plantillas de Helm.

## Instrucciones

### 1. Verificar la instalación de Helm
Asegúrate de tener Helm instalado en tu máquina:
```bash
helm version
```

### 2. Inspeccionar el Chart
Navega a la carpeta de la práctica y observa cómo el archivo `templates/deployment-service.yaml` utiliza etiquetas como `{{ .Values.replicaCount }}` para leer los datos de `values.yaml`.

### 3. Instalar la Aplicación (Crear una Release)
Utiliza Helm para instalar el Chart en tu clúster de `kind`. Le daremos el nombre `mi-web`.

```bash
# Ejecuta esto desde la carpeta k8s-practices/manifests/helm
helm install mi-web ./mi-app
```

### 4. Verificar el despliegue
```bash
helm list
kubectl get pods
kubectl get svc
```
Verás que los recursos se han creado con el prefijo `mi-web-`.

### 5. Actualizar la Aplicación (Upgrade)
Imagina que quieres aumentar el número de réplicas a 3 sin editar el archivo. Puedes pasar valores nuevos por la terminal:

```bash
helm upgrade mi-web ./mi-app --set replicaCount=3
```
Verifica con `kubectl get pods` que ahora tienes 3 réplicas.

### 6. Desinstalar
Para limpiar todos los recursos creados por Helm:
```bash
helm uninstall mi-web
```

## Desafío
Modifica el archivo `values.yaml` para cambiar la versión de la imagen de Nginx a `alpine` y realiza un `helm upgrade` para aplicar el cambio.
