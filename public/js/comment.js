const post_id = document.querySelector('input[name="post-id"]').value;
//console.log(postId);


const commentFormHandler = async (event) => {
  event.preventDefault();
  console.log(post_id);
  const comment = document.querySelector('textarea[name="comment-body"]').value;
  console.log(comment);

  if(comment) {
    const response = await fetch(`/api/post/comment`, {
      method: 'POST',
      body: JSON.stringify({
        comment,
        post_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert(response.statusText);
    }
  };
}

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);