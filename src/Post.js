import React from "react"
import "./Post.css"
import Avatar from '@material-ui/core/Avatar';
function Post({imageUrl,caption,userName}){

  return(
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar"
        alt={userName}
        src=".jpg"/>
        <h5 className="post__avatarName">{userName}</h5>
      </div>
     <img className="post__image" src={imageUrl} alt=""/>

     <h4 className="post__text"><strong> {userName+" "}</strong>{caption}</h4>
    </div>
  )
}
export default  Post
