#. TIP - Tecnicatura En Programacion Informatica - UNQ - CIU(General Belgrano) 👨‍💻

_El proyecto consite en el desarrollo de un sistema para la administracion de un instituto, en el cual se deben poder visualizar/agregar y modificar cursos, inscribir alumnos a los cursos y poder registrar en un alumnos tanto las calificaciones como los pagos mensuales._

### Pre-requisitos 📋

_Java, npm, Eclipse_, MySQL


### Instalación 🔧

```
git clone https://github.com/santiagodea/TipInstituto
cd TipInstituto
npm install

```

## Deployment 📦

```
... ??

```

## Construido con 🛠️

## SERVER 💾
_Como esta en desarrollo podremos correrlo desde Eclipse_

_Instalar Spring Tool en Eclipse desde: Help – Eclipse Marketplace… - buscar: Spring Tools 4_
_luego importar el proyecto en Eclipse desde File - import..._

#### Si se utilizara [MySql](https://dev.mysql.com/downloads/installer/) para persistir los datos.

* [MySql](https://dev.mysql.com/downloads/installer/)
* [MySql Workbench](https://www.mysql.com/products/workbench/)

para crear la base de datos correr los siguientes comandos:
```
-- creo el schema
CREATE DATABASE `Tip-instituto` DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci;

-- selecciono schema
use 'Tip-instituto`;

```
Creo un usuario para la base de datos.
Luego en el archivo : \server\src\main\resources\application.properties corregir el **username** y la **password** que correspondan.

#### Si desea usar [PostgreSQL](https://www.postgresql.org/):
Se deben configurar los archivos: 
**application.properties** reemplazando las lineas 3,4 y 5 por las siguientes:
```
spring.datasource.platform=postgres
spring.datasource.driverClassName=org.postgresql.Driver 
spring.datasource.url=jdbc:postgresql://localhost:5432/mydatabase
```


y **pom.xml** reemplazando las lineas 33,34,35,36 y 37 por las siguientes:
```
<dependency>
<groupId>org.postgresql</groupId>
<artifactId>postgresql</artifactId>
<scope>runtime</scope>
</dependency>
```


hay un test para probar el creado y la consulta en la base.

para acceder a la base desde un JSON hay que correr el InstitutoApplication.java
y consultar desde http://localhost:8080



* [Java](https://www.java.com/es/) con [Eclipse](https://www.eclipse.org)
* [Hibernate](https://hibernate.org/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Maven](https://maven.apache.org/)
* [REST Client, para VSC](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) para hacer consultas REST tipo [POSTMAN](https://www.getpostman.com/)

  * [Travis CI](https://travis-ci.org/santiagodea/TipInstituto) Integracion continua mas test automaticos, PROXIMAMENTE...

## CLIENTE 💻

```
npm start

```
_http://localhost:3000_

## DOCKER 💻

_En construccion..._

_Debo tener instalado Git, Docker & Docker Compose_

_luego corro en una consola:_


```
git clone https://github.com/santiagodea/TipInstituto
cd TipInstituto
docker-compose up

```
_y listo tengo la aplicacion corriendo con el frontend corriendo en http://localhost:3000 y el backend en http://localhost:3001

#### Tecnologias 📲
* [JavaScript](https://www.javascript.com/)
* [React](https://es.reactjs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [HTML](https://developer.mozilla.org/es/docs/HTML/HTML5/HTML5_lista_elementos)
* [CSS](https://www.w3schools.com/css/)
* [NodeJS](https://nodejs.org/es/)

#### Librerias 📚
* [Light Bootstrap Dashboard React](https://www.creative-tim.com/product/light-bootstrap-dashboard-react)
_(FREE BOOTSTRAP REACT ADMIN TEMPLATE)_
* [Axios](https://www.npmjs.com/package/axios)
* [Express](https://www.npmjs.com/package/express)
* [Alert](https://www.npmjs.com/package/react-alert)
* [Router](https://www.npmjs.com/package/router)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* etc...

## Issues 📝

* [Trello](https://trello.com/b/OBJgheWj/tip)
* [Tareas a realizar y/o pendientes](https://github.com/santiagodea/TipInstituto/blob/master/Documentacion-Apuntes/Tareas%20a%20Realizar%20API.md)

## Autor ✒️

* **Santiago De Andrea** - [santiagodea](https://github.com/santiagodea) 😎


## Licencia 📄

Este proyecto es realizado para la presentacion del trabajo final correspondiente a la carrera Tecnicatura en Programacion Informatica.
* [**CIU**](https://www.facebook.com/centrointer.universitario) 🏫
* [**UNQ**](http://www.unq.edu.ar/) 🎓



