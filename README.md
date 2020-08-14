# Twitter API Clone

Este proyecto simula ser la API de Twitter, se maneja a través de comandos ingresados en Postman.  
<br />
<a href="https://github.com/ktoxcon/twitter-clone">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=ktoxcon&bg_color=fff&title_color=001&text_color=001&repo=twitter-clone" />
</a>

# End Point

El proyecto cuenta con un único end point:
`http://localhost:3000/twitter/v1/commands`  
A través de el se pueden utilizar todos los comandos.

# Funcionalidades
 El proyecto cuenta con los siguientes comandos y los argumentos que cada uno puede recibir: 
 | Comando | Argumentos | Descripción | Admite Contenido con Espacios |
 | :---: | :---: | :---: | :---: |
 | `register` | `nombre correo username password` | Registro de Usuario | ✓ |
 | `login` | `username \| email password` | Ingreso a la cuenta | ✕ |
 | `add_tweet` | `contenido` | Agrega un nuevo Tweet | ✓ |
 | `edit_tweet` | `idTweet nuevoContenido` | Modifica un tweet existente | ✓ |
 | `delete_tweet` | `idTweet` | Elimina un Tweet existente | ✕ |
 | `view_tweets` | `* \| username` | Muestra los tweets en base al argumento recibido | ✕ |
 | `follow` | `username` | Seguir a un usuario | ✕ |
 | `unfollow` | `username`| Dejar de seguir a un usuario | ✕ |
 | `profile` | `username` | Ver el perfil propio o de otro usuario | ✕ |
 | `like_tweet` | `idTweet` | Indicar que un Tweet te gusta | ✕ |
 | `dislike_tweet` | `idTweet` | Indicar que un Tweet ya no te gusta | ✕ |
 | `reply_tweet` | `idTweet respuesta` | Responder un tweet e iniciar una conversación | ✓ |
 | `retweet` | `idTweet titulo` | Retweetear | ✓ |
   
 **Los parametros deben ser cambiados en base a las necesidades del usuario**

# Observaciones
## Algunos comandos agregan funcionalidades extra para su utilización.
- En el comando `register`es posible agregar un nombre que incluya espacios, para ello se debe encerrar el nombre dentro de corchetes de la siguiente forma:
  * `register [jose perez] ...`  

 **Si no se agregan los corchetes no se podrá agregar el usuario**
 
- Los comandos `add_tweet` y `edit_tweet` tambien admiten agregar contenido con espacios siempre y cuando este sea encerrado dentro de corchetes de la siguiente forma:  
  * `add_tweet [Un tweet con espacios multiples]`  
  * `edit_tweet id [Nuevo contenido multi espacios]`  

 **Si no se agregan corchetes a los nuevos contenidos con espacios, no será posible agregar o editar el tweet.**
  
- El comando `view_tweets` puede recibir el patrón glob `*` para visualizar los tweets de todos los usuarios de la siguiente forma:
  * `view_tweets *`  
- Si por el contrario se desea visualizar los tweets de un solo usuario, se debe especificar el `username`:  
  * `view_tweets username`
  
# Actualizaciones  
El proyecto fue actualizado para cumplir con los requerimientos nuevos, a continuación se listan algunos cambios importantes:  

- ## Twitter-Command
     Esta nueva versión del proyecto cambio la lógica de verificación de comandos de una carpeta local a la dependencia   
     [Twitter-Command](https://www.npmjs.com/package/twitter-command). Dicha dependencia contiene la librería para validar comandos que se  
     encontraba en la carpeta lib.  
     
- ## Nuevos Comandos
     En la nueva versión del proyecto se agregaron los nuevos comandos:
     ```
      like_tweet
      dislike_tweet
      reply_tweet
      retweet
     ```  
     En la lista de <a href="https://github.com/Ktoxcon/twitter-clone/edit/master/README.md#15">arriba</a> se encuentra información detallada de cada comando y sus argumentos
     
     
     
     
  
