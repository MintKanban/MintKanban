# tmrw

## View [tmrw](https://mintkanban.github.io/MintKanban/)
![Screen-Shot-2020-08-30-at-5.59.05-PM.png](https://s8.gifyu.com/images/Screen-Shot-2020-08-30-at-5.59.05-PM.png)


## Engineers
- [Bryan Sillorequez](http://www.linkedin.com/in/bsillo)
- [Leo Yulin Li](https://www.linkedin.com/in/leoyulinli/)
- [Ryan Tran](https://www.linkedin.com/in/rdtran/)


## About tmrw

TMRW is a single page app that allows a single user to create a customizable planner
and to store their plans, goals, and tasks all in one place.  The information that 
the user puts on this Kanban board is saved to local storage so the user can come 
back to revisit their goals.

TMRW was created in three days as part of the JavaScript Olmpics Hack-a-thon 
hosted by [Mintbean](https://www.mintbean.io/)

![Screen-Shot-2020-08-30-at-6.05.33-PM.png](https://s8.gifyu.com/images/Screen-Shot-2020-08-30-at-6.05.33-PM.png)

## Technologies

- Frontend
  - Typescript
  - JavaScript
  - React
  - CSS
  - HTML

- Deployment
  - [Feature Peak](https://www.featurepeek.com)

- Libraries
  - React-Beautiful-DND
  - React-Tours
  - React-Bootstrap
  
## Features

### Drag and drop columns and task cards
  - User can move their task into different columns to keep track of progress or organise their data
  - Columns can move freely, allowing users to put their lists in any order they want.

![tmrw_drags.gif](https://s8.gifyu.com/images/tmrw_drags.gif)

### Task creation and editable task
  - Each task and list can be created by pressing the add buttons to their respected components
  - Each task and list can be deleted at any time
  - Once clicked, a task will expand into a modal for easy accessibility to read, write and edit

![tmrw_tasks.gif](https://s8.gifyu.com/images/tmrw_tasks.gif)

### Download and upload 
  - The user can download their plans to disk storage if they want to view their plans offline
  - If the user has a list they want to upload, they can simply use the upload button

[![tmrw_updown.gif](https://s8.gifyu.com/images/tmrw_updown.gif)](https://gifyu.com/image/gkz3)

### Tutorial

  - Tutorial pop-ups to help guide new and current users how to use each feature



## Code Snippets

### Multi-level Currying

```
const moveCardToList = (from: string) => (index: number) => (to: string) => {
    if (from === to) return;
    const source = [...lists[from]];
    const card = source.splice(index, 1);
    const target = [...lists[to], ...card];
    setLists({
      ...lists,
      [from]: source,
      [to]: target
    });
  }
```

We learned about currying and we had the chance to apply it.  In this code snippet,
we applied multi-level currying making the code more readable for other programmers.

### Threading and keeping code dry

```
export default function EditCard(
  { card, editCard, deleteCard, handleClose, show, moveCardToList, listOrder, listName }: EditCardProps) {

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description)
  const [moveTo, setMoveTo] = useState(listName)

  const save = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    editCard(new CardData(title, description));
    moveCardToList(moveTo);
    handleClose();
  }
  
  const remove = () => {
    deleteCard();
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"
                          placeholder={'Insert a task'}
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                          value={description}
                          onChange={e => setDescription(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="in-list">
            <Form.Label>Move To</Form.Label>
            <Form.Control as="select" value={ moveTo } onChange={ e => setMoveTo(e.target.value) }>
              { listOrder.map(list => <option key={ list }>{ list }</option>)}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={save}>Save Changes</Button>
        <Button variant="danger" onClick={remove}>Delete</Button>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
```
We kept our code DRY by threading our data through one source.  Doing this made us
keep track of our data and where we were sending it to.  We followed this structure
for all our components.

## What we learned

We learned to collaborate and create a fully functional app, starting from the 
command line.  Over three days, we applied our knowledge of JavaScript, Typscript,
and React, and applied tools to strengthen our knowledge such as React Hooks and
Currying.  Collaborating remotely shows that we can work well with others by 
communicating clearly to each other and listen to each others ideas while
producing a product within the provided time frame.