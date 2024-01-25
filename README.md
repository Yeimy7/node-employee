# Sistema Gestión de Empleados

Aplicación de gestión de empleados para empresas. Proporciona funciones esenciales como la creación, modificación y eliminación de empleados, así como la capacidad de listarlos según diferentes criterios, incluyendo la asignación a departamentos específicos. Para garantizar la seguridad, se implementa un sistema de registro y autenticación basado en tokens JWT. 

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de pruebas._

### Pre-requisitos 📋

Para clonar y ejecutar esta aplicación, necesitará [Git](https://git-scm.com) y [Node.js](https://nodejs.org/en/download/) (que viene con [npm](http://npmjs.com)) instalado en su computadora.

Además, necesita crear una base de datos en MySQL. Puede utilizar el script db.sql ubicado en la raiz del proyecto.

La figura a continuación refleja el modelo relacional:

![screenshot](https://res.cloudinary.com/ddisfxkub/image/upload/v1706150632/u2nvy5zzqrxrbmg2i1jv.png)

### Instalación 🔧

Para tener el proyecto en su computadora: 

```bash
# Clonar este repositorio
$ git clone https://github.com/Yeimy7/image-Uploader

# Instalar dependencias
$ npm install

```
_En la raíz del proyecto, crea el archivo .env para definir las variables de entorno:_

```
PORT = '3000'
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = ''
DB_PORT = '3306'
DB_DATABASE = 'aqui el nombre de tu bd'
WORD_SECRET = 'clave4859'
WORD_SECRET_RESET = 'otraclave845123'
EMAIL = 'un email para el reset del password'
PASSWORD = 'un pass para el reset del password'
URL_FRONT = 'http://localhost:5173'
```

_Y levantar el proyecto_

```
npm start
```

_En este punto ya tiene un usuario con el rol de Administrador (necesario para registrar otros usuarios) registrado en la base de datos para probar la api_


## Ejecutando las pruebas ⚙️

_Para la autenticacion como administrador utilice:_

```
    email: "admin@gmail.com",
    password: "123456",
```
### Autenticación con JWT 

_Envie las credenciales a la siguiente ruta (utilice su puerto) para la autenticación_

```
http://localhost:${PORT}/api/auth/signin
```
_Como se muestra en la figura a continuación:_

![screenshot](https://res.cloudinary.com/ddisfxkub/image/upload/v1706151538/atjpjmto0lkpcqgahqo2.png)


### Rutas con las que cuenta el proyecto
---
#### Auth

_Autenticación y obtencion del token:_

```
http://localhost:${PORT}/api/auth/signin

body:

{
  "email":"admin@gmail.com",
  "password": "123456"
}
```
_Cambiar el password:_

```
http://localhost:${PORT}/api/auth/change-pwd

body:

{
  "password": "123456",
  "newPassword":"1234567"
}
```

_Olvidé la contraseña:_

```
http://localhost:${PORT}/api/auth/forgot-password

body:
{
  "email":"admin@gmail.com"
}
```

_Reiniciar la contraseña:_

```
http://localhost:${PORT}/api/auth/new-password

headers:
{
    reset: TOKEN_ENVIADO_POR_EMAIL
}

body:
{
  "newPassword":"224466"
}
```
---
#### Departamentos

_Crear, listar todos, listar por id, modificar y eliminar departamentos:_

```
// Crear departamento

http://localhost:${PORT}/api/department

body:
{
  "department_name": "RRHH",
  "description": "Departamento de recursos humanos"
}
```
---
#### Empleados

_Crear, listar todos, listar por id, modificar y eliminar empleados:_

```
// Crear empleado

http://localhost:${PORT}/api/employee

body:
{
  "names": "Juan",
  "last_names": "Lopez",
  "ci": "1234567",
  "genre":"masculino",
  "position": "Analista de nomina",
  "salary":4500,
  "id_department": "INTRODUZCA_ID_DEP"
}
```

_Filtros por departamento, género, posición y salario de empleados:_

```
// filtro por departamento

http://localhost:${PORT}/api/employee?depto=4895d4c7-e184-46a1-81be-a7c2486dafc3

// filtro por salario

http://localhost:${PORT}/api/employee?salary=4500

// filtro por genero

http://localhost:${PORT}/api/employee?genre=masculino

// filtro por posición

http://localhost:${PORT}/api/employee?position=jefe

// filtro por departamento y genero

http://localhost:${PORT}/api/employee?depto=4895d4c7-e184-46a1-81be-a7c2486dafc3&genre=masculino

```

## Construido con 🛠️

* [Nodejs](hhttps://nodejs.org/en/guides)
* [Express](https://expressjs.com/en/starter/installing.html) - El framework web usado

## Autora ✒️

* **Yeimy Gabriela Limachi Carrillo** 

- GitHub [@Yeimy7](https://github.com/Yeimy7)
- Twitter [@Yeimy_Briela](https://twitter.com/Yeimy_Briela)

