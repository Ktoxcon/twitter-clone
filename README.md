# Twitter API Clone

Este proyecto simula ser la API de Twitter, se maneja a través de comandos ingresados en Postman.  
Se encuentra bajo la licencia GPLv3 de Software Libre.
<br 7>
<a href="https://github.com/ktoxcon/twitter-clone">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=ktoxcon&bg_color=fff&title_color=000&text_color=000&repo=twitter-clone" />
</a>

# End Point

El proyecto cuenta con un único end point:
`http://localhost:3000/twitter/v1/commands`  
A través de el se pueden utilizar todos los comandos.

# Funcionalidades
 El proyecto cuenta con la siguiente lista de comandos y parámetros que pueden ser utilizados para realizar acciones en la API
 - `register nombre correo username password`
 - `login username or email password`
 - `add_tweet contenido`
 - `edit_tweet id nuevoContenido`
 - `delete_tweet id`
 - `view_tweets param`
 - `follow username`
 - `unfollow username`
 - `profile username`  
Los parametros deben ser cambiados en base a las necesidades del usuario

# Observaciones
## Algunos comandos agregan funcionalidades extras para su utilización.
- En el comando `register`es posible agregar un nombre que incluya espacios, para ello se debe encerrar el nombre dentro de corchetes de la siguiente forma:
  * `register [jose perez] ...`  
 
 #### Si no se agregan los corchetes no se podrá agregar el usuario
 
- Los comandos `add_tweet` y `edit_tweet` tambien admiten agregar contenido con espacios siempre y cuando este sea encerrado dentro de corchetes de la siguiente forma:  
  * `add_tweet [Un tweet con espacios multiples]`  
  * `edit_tweet id [Nuevo contenido multi espacios]`    
  
 #### Si no se agregan corchetes a los nuevos contenidos con espacios, no será posible agregar o editar el tweet.
  
- El comando `view_tweets` puede recibir el patrón glob `*` para visualizar los tweets de todos los usuarios de la siguiente forma:
  * `view_tweets *`  
- Si por el contrario se desea visualizar los tweets de un solo usuario, se debe especificar el `username`:  
  * `view_tweets username`
