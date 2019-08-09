[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")
[![Build status](https://api.travis-ci.org/Polymer/pwa-starter-kit.svg?branch=master)](https://travis-ci.org/Polymer/pwa-starter-kit)

> ## 🛠 Estado: En Desarrollo
> Softire es un proyecto en actual desarrollo. Esta en el camino rapido a la version 1.0
>
> Ver la lista de problemas conocidos. en los TODOs, abajo, para actualizaciones.

# Softire

Softire es una aplicacion web orientada al historial de procesos del reencauchamiento de neumaticos.
Caracteristicas:
- Beneficios de unaPWA (manifesto y service worker)
- interface responsiva
- temado de aplicacion
- administracion de estados por redux
- Interface Offline
- resolucion de rutas simple
- tiempo rapido para ser interactiva y primer pintado
- despliegue para hosting statico o prpl-server
- pruebas unitarias y puntos de entrada
- documentacion de patrones avanzados

### 📖 Documentacion de  [documentation site](https://pwa-starter-kit.polymer-project.org/) for more details or check out [how to get started](https://pwa-starter-kit.polymer-project.org/setup/)!

## 📝 Table of Contents
<!-- - [Problem Statement](#problem_statement) -->
<!-- - [Idea / Solution](#idea) -->
- [Dependencies / Limitations](#limitations)
- [Setting up a local environment](#getting_started)
- [Usage](#usage)
- [Technology Stack](#tech_stack)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## ⛓️ Dependencies / Limitations <a name = "limitations"></a>
- Node 12.x

### Prerequisites

Install node on your system
https://nodejs.org/en/

### Setup

Clone the repo
```
git clone https://github.com/sdyalor/softire.pwa.git
```
cd to the project directory

```
cd softire.pwa
```
Reinstall dependencies
```
npm install
```
Run the develop environment
```
npm run start:webpack
```
After this stage the app should expose the 5000 http port and 5001 https
but the app works with https forced by default

## 🎈 Usage <a name="usage"></a>

The basic test to the api is a curl to the https port with the table endpoint
```
http://localhost:8080
```


## ⛏️ Built With <a name = "tech_stack"></a>
- [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-editions-express) - Database
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) - Server Framework
- [.NET Core 3.0](https://dotnet.microsoft.com/download/dotnet-core/3.0) - Server Environment


## ✍️ Authors <a name = "authors"></a>
- [sdyalor](https://github.com/sdyalor) - Idea & Initial work

See also the list of [contributors](https://github.com/devrheber/softire/contributors) 
who participated in this project.


## 🎉 Acknowledgments <a name = "acknowledgments"></a>
- Graphql core 
- Inspiration
- References

## TODOs

- [x] Setup Safari testing on Travis.
- [x] Deploy all templates as demos.
- [ ] Update to latest [Material Web Components](https://github.com/material-components/material-components-web-components).
