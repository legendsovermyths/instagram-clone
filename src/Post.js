import React from "react"
import "./Post.css"
import Avatar from '@material-ui/core/Avatar';
function Post({imageUrl,caption,username}){

  return(
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar"
        alt={username}
        src=".jpg"/>
        <h5 className="post__avatarName">{username}</h5>
      </div>
     <img className="post__image" src={imageUrl} alt=""/>

     <h4 className="post__text"><strong> {username+" "}</strong>{caption}</h4>
    </div>
  )
}
export default  Post
