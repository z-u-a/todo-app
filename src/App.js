import { MdDelete, MdSettingsBackupRestore, MdModeEdit, MdDone } from "react-icons/md";
import { Grid, Row, Col } from 'react-flexbox-grid';
import React from 'react';


function App() {
  /**
   * App's state manages by React useState Hook 
   */
  const [toDoItems, setToDoItems] = React.useState([]);
  const [text, setText] = React.useState('');
  const [editMode, setEditMode] = React.useState(true);
  const [indexOfEdit, setIndexOfEdit] = React.useState(0);
  const [buttonText, setButtonText] = React.useState("Add");
  const [doneItems, setDoneItems] = React.useState([]);

  /**
   * Handles onClick() and onKeyPress() events on Submit button and textbox respectively
   * @param {*} e 
   */
  const onSubmit = (e) => {
    if ((e.type === "click" || e.keyCode === 13) && !doesTextAlreadyExist(text, toDoItems) && text) {
      if (editMode === true) {
        let localCopyToDoItems = [...toDoItems];
        localCopyToDoItems.splice(indexOfEdit, 1, text.trim());
        setToDoItems(localCopyToDoItems);
        setEditMode(false);
        setText("");
        setButtonText("Add");
      } else {
        let localCopyToDoItems = [...toDoItems];
        localCopyToDoItems.push(text.trim());
        setToDoItems(localCopyToDoItems);
        setText("");
      }
    }
    else if (e.keyCode === 27) {
      setText("");
      setEditMode(false);
      setButtonText("Add");
      document.getElementById("itemContainer").blur();
    }
  }

  const doesTextAlreadyExist = (textToCheck, arrayToCheck) => {
    return arrayToCheck.includes(textToCheck.trim());
  }

  /**
   * Handles text being witten in input field
   * @param {} e 
   */
  const onChange = (e) => {
    setText(e.target.value)
  }

  const onDelete = (index) => {
    let localCopyToDoItems = [...toDoItems];
    localCopyToDoItems.splice(index, 1);
    setToDoItems(localCopyToDoItems);
  }

  const onEdit = (index) => {
    document.getElementById("itemContainer").focus();
    setEditMode(true);
    setButtonText("Update");
    let itemToEdit = toDoItems[index];
    setIndexOfEdit(index);
    setText(itemToEdit.toString());
  }

  const onDone = (index) => {
    if (!doesTextAlreadyExist(toDoItems[index], doneItems)) {
      let localCopyToDoItems = [...toDoItems];
      let tempDoneItems = [...doneItems];
      tempDoneItems.push(toDoItems[index]);
      setDoneItems(tempDoneItems);
      localCopyToDoItems.splice(index, 1);
      setToDoItems(localCopyToDoItems);
    }
  }

  const returnDoneItem = (index) => {
    if (!doesTextAlreadyExist(doneItems[index], toDoItems)) {
      let localCopyToDoItems = [...toDoItems];
      let tempDoneItems = [...doneItems];
      localCopyToDoItems.push(tempDoneItems[index]);
      tempDoneItems.splice(index, 1);
      setDoneItems(tempDoneItems);
      setToDoItems(localCopyToDoItems);
    }
  }

  return (
    <div >
      <h1>The TO-DO App</h1>
      <input id="itemContainer" type="text" name="to-do" value={text} onChange={onChange} onKeyDown={onSubmit} /><span> </span>
      <button type="submit" onClick={onSubmit} >
        {buttonText}
      </button>

      <Grid fluid>
        <Row>
          <Col xs={6} md={3}>
            <h3 >To do:</h3>
            {
              toDoItems.map((item, index) =>
                <ul id="list" key={index}>
                  <Row>
                    <Col>
                      <li>
                        {item}
                      </li>
                    </Col>
                    <Col>
                      <MdDelete onClick={() => onDelete(index)} />
                      <MdModeEdit onClick={() => onEdit(index)} />
                      <MdDone onClick={() => onDone(index)} />
                    </Col>
                  </Row>
                </ul>
              )
            }
          </Col>
          <Col xs={6} md={3}>
            <h3>Done:</h3>
            {
              doneItems.map((done, index) =>
                <ul id="done" key={index}>
                  <Row>
                    <Col>
                      <li >
                        {done}
                      </li>
                    </Col>
                    <Col>
                      <MdSettingsBackupRestore onClick={() => returnDoneItem(index)} />
                    </Col>
                  </Row>
                </ul>
              )
            }
          </Col>
        </Row>
      </Grid>

    </div>
  );

}

export default App;
