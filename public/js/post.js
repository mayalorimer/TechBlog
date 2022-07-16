

const newFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#titleInp').value.trim();
    const description = document.querySelector('#descInp').value.trim();
    console.log(title, description);
    if (title && description) {
      const response = await fetch(`/api/post/post`, {
        method: 'POST',
        body: JSON.stringify({ title, description}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
    }
  };

  
  
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);


    const delButtonHandler = async (event) => {
      if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id); 
        const response = await fetch(`/api/post/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete project');
        }
      }
    };

    document
  .querySelector('.delete')
  .addEventListener('click', delButtonHandler);

    