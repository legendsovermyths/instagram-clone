import React from "react"
import "./Post.css"
import Avatar from '@material-ui/core/Avatar';
function Post(){

  return(
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar"
        src="https://instagram.fdel1-2.fna.fbcdn.net/v/t51.2885-19/s320x320/94307070_571317643500510_3539695939788734464_n.jpg?_nc_ht=instagram.fdel1-2.fna.fbcdn.net&_nc_ohc=yAWPSdGINx8AX9olRaY&oh=40e0298ceeb338337c25e6db5ca4882f&oe=5F51D6EF"
        alt="Anibitte"/>
        <h5 className="post__avatarName">Anibitte</h5>
      </div>
     <img className="post__image" src="https://miro.medium.com/max/10944/0*mtxOqq07ge9Wb03k" alt=""/>

     <h4 className="post__text"><strong> Anibitte</strong>:WoW this thing is awesome</h4>
    </div>
  )
}
export default  Post
