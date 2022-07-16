const post_id = document.querySelector('input[name="post-id"]').value;

async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#new-content').value.trim();
    console.log(title);
    console.log(post_id);

    

      const response = await fetch(`/api/post/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);