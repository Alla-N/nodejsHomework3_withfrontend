export const createListItem = (item, deleteFunction, assignFunction, editFunction) => {
  const deleteButton = document.createElement('BUTTON');
  deleteButton.className = 'list__button';
  deleteButton.addEventListener('click', deleteFunction);
  deleteButton.innerText = '✖';
  deleteButton.title = 'Delete';
  deleteButton.value = item._id;

  const assignButton = document.createElement('BUTTON');
  assignButton.className = 'list__button';
  assignButton.addEventListener('click', assignFunction);
  assignButton.innerText = '✔';
  assignButton.title = 'Assign';
  assignButton.value = item._id;

  const editButton = document.createElement('BUTTON');
  editButton.className = 'list__button';
  editButton.addEventListener('click', editFunction);
  editButton.innerText = '✏️';
  editButton.title = 'Edit';
  assignButton.value = item._id;

  let li = document.createElement('LI');
  li.innerHTML = `${item.model} ` ;
  li.appendChild(deleteButton);
  li.appendChild(assignButton);
  li.appendChild(editButton);
  li.id = item._id;
  li.className = "list__item";
  if(item.status === 'assigned'){
    li.value = '1';
  }

  return li
};

export const createTruckList = (array, deleteFunction, assignFunction, editFunction) => {
  const ul = document.getElementById('listUl');
  ul.innerHTML = '';
  const fragment = document.createDocumentFragment();
  array.forEach(item=>{
    fragment.appendChild(createListItem(item, deleteFunction, assignFunction, editFunction));
  });

  ul.appendChild(fragment);
};
