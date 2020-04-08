export const createListItem = (item, deleteFunction, postFunction, editFunction) => {
  const deleteButton = document.createElement('BUTTON');
  deleteButton.className = 'list__button';
  deleteButton.addEventListener('click', deleteFunction);
  deleteButton.innerText = '✖';
  deleteButton.title = 'Delete';
  deleteButton.value = item._id;

  const postButton = document.createElement('BUTTON');
  postButton.className = 'list__button';
  postButton.addEventListener('click', postFunction);
  postButton.innerText = 'POST';
  postButton.title = 'Post';
  postButton.value = item._id;

  const editButton = document.createElement('BUTTON');
  editButton.className = 'list__button';
  editButton.addEventListener('click', editFunction);
  editButton.innerText = '✏️';
  editButton.title = 'Edit';
  editButton.value = item._id;

  let li = document.createElement('LI');
  li.innerHTML = `${item.name} ` ;
  li.appendChild(deleteButton);
  li.appendChild(postButton);
  li.appendChild(editButton);
  li.id = item._id;
  li.className = "list__item";
  if(item.status === 'assigned'){
    li.value = '1';
  } else if (item.status === 'posted') {
    li.value = '2';
  }

  return li
};

export const createLoadsList = (array, deleteFunction, assignFunction, editFunction) => {
  const ul = document.getElementById('listUl');
  ul.innerHTML = '';
  const fragment = document.createDocumentFragment();
  array.forEach(item=>{
    fragment.appendChild(createListItem(item, deleteFunction, assignFunction, editFunction));
  });

  ul.appendChild(fragment);
};
