# UNQFY


## Equipo✒️

* **Facundo Videla** 
* **Nicolas Bellini**
* **Sergio Delgadillo**

## Comenzando 🚀


### Pre-requisitos 📋

Node.JS 

### Instalación 🔧

Clonar el repo

```
https://github.com/khalilfa/servicios-cloud.git
```


Instalar las dependencias

```
npm install
```


## Uso ⚙️

* Creación de un Album con Artista y canciones: 


Lo primero de debemos hacer es crear el artista ...

```
npm start addArtist name "Radiohead" country "Inglaterra"
```
Luego el álbum asociado al artista:

```
npm start addAlbum artist "Radiohead" name "OK Computer" year 1997
```

... Por ultimo agregamos las canciones al disco con los parámetros indicados:

```
npm start addTrack name "Paranoid Android" duration 400 genres "Rock" album "OK Computer"
```
* Creación de Playlist  por genero

Si deseamos crear una lista de algún genero especifico por un tiempo determinado:
```
npm start addPlaylist name "random pop" genres "rock" duration 60
```

* Buscar en el repositorio:

Puede buscar coincidencias de Artistas ,Albums ,Tracks o Playlists
```
npm start search name "Radio"
```



### Test 🔩

```
npm test
```

### Modelo

![Screenshot](UNQfy.png)