import React, { useEffect, useState } from "react";

import "./App.css"

const App = () => {
  const getLocalItems = () => {
    let list = localStorage.getItem("ToDo List");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [addInputValue, setAddInputValue] = useState(getLocalItems());
  const [isEdit, setisEdits] = useState(false);

  const editItem = (_id) => {
    let findEdit = addInputValue.find((element) => {
      return element.id === _id;
    });

    setInputData(findEdit.name);
    setisEdits(true);
    deleteItem(findEdit.id);
  };

  const addItems = () => {
    if (inputData.length > 0) {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      console.log(allInputData.id);
      setAddInputValue([...addInputValue, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const upDatedItem = addInputValue.filter((element) => {
      return id !== element.id;
    });

    setAddInputValue(upDatedItem);
  };

  useEffect(() => {
    localStorage.setItem("ToDo List", JSON.stringify(addInputValue));
  }, [addInputValue]);

  const clearAllItems = () => {
    if (window.confirm("ok")) {
      setAddInputValue([]);
    }
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <i className="bi bi-journal-check"></i>
            <figcaption>Add Your List Here </figcaption>
          </figure>

          <div className="addItemss">
            <div className="addDiv">
              <input
                type="text"
                placeholder="Write Add Items"
                value={inputData}
                onChange={(event) => {
                  setInputData(event.target.value);
                }}
              />
              {!isEdit && (
                <i
                  className="fa fa-plus add-btn"
                  onClick={addItems}
                  title="Add Items"
                ></i>
              )}

              {isEdit && (
                <i
                  className="bi bi-pencil-square fa add-btn"
                  onClick={addItems}
                ></i>
              )}
            </div>
          </div>
          <div className="showItems">
            {addInputValue.map((value) => {
              return (
                <div className="eachItem" key={value.id}>
                  <h3>{value.name}</h3>

                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => {
                        editItem(value.id);
                      }}
                    ></i>

                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => {
                        deleteItem(value.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems" disabled>
            <button
              className={`btn effect04 ${
                addInputValue.length <= 0 ? "disabled" : ""
              }`}
              data-sm-link-text="Remove All"
              onClick={clearAllItems}
            >
              <span>
                {addInputValue.length <= 0 ? "ADD SOME LIST" : " CLEAR LIST"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
