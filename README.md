# Twitter API Clone

Este proyecto simula ser la API de Twitter, se maneja a través de comandos ingresados en Postman.  
<br />
<a href="https://github.com/ktoxcon/twitter-clone">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=ktoxcon&bg_color=fff&title_color=001&text_color=001&repo=twitter-clone" />
</a>

# Actualizaciones  
El proyecto fue actualizado para cumplir con los requerimientos nuevos, a continuación se listan algunos cambios importantes:  

- ## Twitter-Command
     Esta nueva versión del proyecto cambio la lógica de verificación de comandos de una carpeta local a la dependencia  
     [Twitter-Command](https://www.npmjs.com/package/twitter-command).  Dicha dependencia contiene la librería para validar comandos que se
     encontraba en la carpeta lib.  
     
- ## Nuevos Comandos
     En esta versión del proyecto se agregaron los nuevos comandos:
     ```
      like_tweet
      dislike_tweet
      reply_tweet
      retweet
     ```  
     En la lista de <a href="#list">abajo</a> se encuentra información detallada de cada comando y sus argumentos.  
     Cada comando tiene observaciones para su uso, estas se encuentran en el apartado de <a href="#obs">observaciones</a>.

# End Point

El proyecto cuenta con un único end point:
`http://localhost:3000/twitter/v1/commands`  
A través de el se pueden utilizar todos los comandos.

<a id="list"></a>
# Funcionalidades
<a id="list"></a>
 El proyecto cuenta con los siguientes comandos: 
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
<a id="obs"></a>
# Observaciones
  A continuación puede encontrar observaciones del uso de algunos comandos.
  
  - ### Contenido con espacios 
    Los siguientes comandos admiten contenido con espacios **siempre y cuando este sea rodeado por corchetes**:  
    - `register`
    - `add_tweet` 
    - `edit_tweet`
    - `reply_tweet`
    - `retweet`
    
    Ejemplos:  
    | Comando | Sin espacios | Con Espacios |
    | :---: | :---: | :---: |
    | `register` | `register joseperez js@js.com js root` | `register [jose perez] js@js.com js root` |
    | `add_tweet` | `add_tweet SinEspacios` | `add_tweet [Con espacios]`|
    | `edit_tweet` | `edit_tweet idTweet SinEspacios` | `edit_tweet idTweet [Con espacios]`|
    | `reply_tweet` | `reply_tweet idTweet SinEspacios` | `reply_tweet idTweet [Con espacios]`|
    | `retweet` | `retweet idTweet SinEspacios` | `retweet idTweet [Con espacios]`|

  - ### Like y Dislike 
    Los comandos `like_tweet` y `dislike_tweet` tienen el siguiente comportamiento por defecto:   
    - Si ya se habia dado like a un tweet con anterioridad y se acciona el comando  
      `like_tweet` de nuevo en el mismo tweet, este dará dislike al tweet. 
      
    - Si ya se habia dado dislike a un tweet con anterioridad y se acciona el comando  
      `dislike_tweet` de nuevo en el mismo tweet, este dará like al tweet.
      
     Este comportamiento trata de simular al botón like de la red social original.
     
  - ### Retweet 
    El comando `retweet`cuenta con la siguiente característica especial:
    - Además de aceptar contenido que puede o no tener espacios, a este comando se le puede
      pasar **[]** para indicar que no se desea agregar un título al retweet.
      
      **Ejemplo**:  
      | Comando | Sin espacios | Con Espacios | Sin titulo |
      | :---: | :---: | :---: | :---: |
      | `retweet` | `retweet idTweet SinEspacios` | `retweet idTweet [Con espacios]`| `retweet idTweet []`|
      
      **Es importante que si no se desea agregar titulo al retweet se pasen los dos corchetes siempre!**
      
  - ### View Tweets
    El comando `view_tweets` funciona tanto para ver todos los tweets como para los tweets de un solo usuario  
      **Ejemplo**:  
      | Comando | Todos los Tweets |  Tweets de un Usuario|
      | :---: | :---: | :---: |
      | `view_tweets` | `view_tweets *` | `view_tweets username`|

<hr>

<p align="center">Hecho con <del>el ❤️</del> con una 💻 por Ktoxcon</p>
