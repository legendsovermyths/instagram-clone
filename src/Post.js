import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";

function Post({ postId, imageUrl, caption, username }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  const postComment = (e) => {};

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar className='post__avatar' alt={username} src='.jpg' />
        <h5 className='post__avatarName'>{username}</h5>
      </div>
      <img className='post__image' src={imageUrl} alt='' />
      <h4 className='post__text'>
        <strong> {username + " "}</strong>
        {caption}
      </h4>
      <form className='post__commentBox'>
        <input
          className='post__input'
          type='text'
          placeholder='Add a comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className='post__button'
          disabled={!comment}
          onClick={postComment}
          type='submit'>
          Post
        </button>
      </form>
    </div>
  );
}
export default Post;
