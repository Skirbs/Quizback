import {createContext, useReducer} from "react";
import {json} from "react-router-dom";
export const DataContext = createContext({dataState: {}, addCardGroup: () => {}});

// ? classes
class CardGroup {
  constructor(name, category, dateCreated, dateModified, key) {
    this.name = name;
    this.category = category;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.cardsStored = [];
    this.sideColor = "red";
    this.key = key;
    console.log(key);
  }
}
class Card {
  constructor(question, answer, tag, dateCreated, dateModified, dateNextStudy, key) {
    this.question = question;
    this.answer = answer;
    this.tag = tag;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.dateNextStudy = dateNextStudy;
    this.sideColor = "red";
    this.key = key;
  }
}

class Category {
  constructor(name, sideColor) {
    this.name = name;
    this.sideColor = sideColor;
  }
}

class Tag {
  constructor(name, sideColor) {
    this.name = name;
    this.sideColor = sideColor;
  }
}

// ? Reducer
function mainDataReducer(state, action) {
  const stateCopy = {...state};
  const payload = action.payload;

  function save(data) {
    localStorage.setItem("mainData", JSON.stringify(data));
  }
  switch (action.type) {
    case "ADDCARDGROUP":
      const newCardGroup = new CardGroup(
        payload.name,
        payload.category,
        payload.dateCreated,
        payload.dateModified,
        payload.key
      );
      stateCopy.cardGroups.push(newCardGroup);
      save(stateCopy);
      break;
    case "ADDCARD":
      const newCard = new Card(
        payload.question,
        payload.answer,
        payload.tag,
        payload.dateCreated,
        payload.dateModified,
        payload.dateNextStudy,
        payload.key
      );
      stateCopy.cardGroups[payload.selectedGroup].cardsStored.push(newCard);
      save(stateCopy);
      console.log(stateCopy);
      break;
  }
  return stateCopy;
}

// ? Main Component
export default function DataContextComponent({children}) {
  const [dataState, dataDispatch] = useReducer(
    mainDataReducer,
    JSON.parse(localStorage.getItem("mainData")) || {categories: [], tags: [], cardGroups: []}
  );
  let selectedGroup = 0;
  function addCardGroup(name, category, dateCreated, dateModified) {
    const key = Math.random().toString(36).slice(2, -1);
    dataDispatch({
      type: "ADDCARDGROUP",
      payload: {
        name,
        category,
        dateCreated,
        dateModified,
        key,
      },
    });
  }

  function addCard(question, answer, tag, dateCreated, dateModified, dateNextStudy) {
    const key = Math.random().toString(36).slice(2, -1);
    dataDispatch({
      type: "ADDCARD",
      payload: {
        question,
        answer,
        tag,
        dateCreated,
        dateModified,
        dateNextStudy,
        selectedGroup,
        key,
      },
    });
  }
  const contextData = {dataState, addCardGroup, selectedGroup, addCard};
  return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>;
}

// TODO: create tag and category function (make it one reducer)
// TODO: state reducer for cardgroup and cards function
// TODO: truncate long names, question, and answer
