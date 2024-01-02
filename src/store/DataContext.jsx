import {createContext, useReducer} from "react";
import {json} from "react-router-dom";
export const DataContext = createContext({addCardGroup: () => {}});

// ? classes
class CardGroup {
  constructor(name, category, dateCreated, dateModified, cardsStored, sideColor, key) {
    self.name = name;
    self.category = category;
    self.dateCreated = dateCreated;
    self.dateModified = dateModified;
    self.cardsStored = cardsStored;
    self.sideColor = sideColor;
    self.key = key;
  }
}
class Card {
  constructor(
    question,
    answer,
    tag,
    dateCreated,
    dateModified,
    dateNextStudy,
    cardsStored,
    sideColor,
    key
  ) {
    self.question = question;
    self.answer = answer;
    self.tag = tag;
    self.dateCreated = dateCreated;
    self.dateModified = dateModified;
    self.dateNextStudy = dateNextStudy;
    self.cardsStored = cardsStored;
    self.sideColor = sideColor;
    self.key = key;
  }
}

// ? Reducer
function mainDataReducer(state, action) {
  const stateCopy = [...state];
  const payload = action.payload;

  function save(data) {
    localStorage.setItem("mainData", JSON.stringify(data));
  }
  switch (action.type) {
    case "ADDCARDGROUP":
      const newCardGroup = new CardGroup(
        payload.name,
        payload.dateCreated,
        payload.dateModified,
        payload.cardsStored,
        payload.sideColor,
        payload.key
      );
      stateCopy.push(newCardGroup);
      break;
  }
  return stateCopy;
}
function cardGroupReducer(state, action) {
  return state;
}
function cardReducer(state, action) {
  return state;
}

// ? Main Component
export default function DataContextComponent({children}) {
  const [dataState, dataDispatch] = useReducer(mainDataReducer, []);
  function addCardGroup(name, dateCreated, dateModified, cardsStored, sideColor) {
    const key = Math.random().toString(36).slice(2, 7);
    dataDispatch({
      type: "ADDCARDGROUP",
      payload: {
        name,
        dateCreated,
        dateModified,
        cardsStored,
        sideColor,
        key,
      },
    });
  }
  const contextData = {addCardGroup};

  return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>;
}

// TODO: state reducer for cardgroup and cards function
