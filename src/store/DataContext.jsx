import {createContext, useReducer, useRef} from "react";
import {json, useParams} from "react-router-dom";
export const DataContext = createContext({dataState: {}, addCardGroup: () => {}});

// ? classes
class CardGroup {
  constructor(name, categoryName, dateCreated, dateModified, sideColor, key) {
    this.name = name;
    this.categoryName = categoryName;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.cardsStored = [];
    this.tags = [{name: "None", sideColor: "transparent", key: "N"}];
    this.sideColor = sideColor;
    this.key = key;
    console.log(key);
  }
}
class Card {
  constructor(question, answer, tag, dateCreated, dateModified, dateNextStudy, sideColor, key) {
    this.question = question;
    this.answer = answer;
    this.tag = tag;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.dateNextStudy = dateNextStudy;
    this.sideColor = sideColor;
    this.key = key;
  }
}

class Category {
  constructor(name, sideColor, key) {
    this.name = name;
    this.sideColor = sideColor;
    this.key = key;
  }
}

class Tag {
  constructor(name, sideColor, key) {
    this.name = name;
    this.sideColor = sideColor;
    this.key = key;
  }
}

// ? Reducer
function mainDataReducer(state, action) {
  const stateCopy = {...state};
  const payload = action.payload;

  function save(data) {
    localStorage.setItem("mainData", JSON.stringify(data));
    console.log(stateCopy);
  }

  function getGroupIndexById(key) {
    const groupIndex = stateCopy.cardGroups.findIndex((elem) => elem.key === key);
    return groupIndex;
  }
  function getCardIndexById(key, cardGroupIndex) {
    const cardIndex = stateCopy.cardGroups[cardGroupIndex].cardsStored.findIndex(
      (elem) => elem.key === key
    );
    return cardIndex;
  }
  function getCategoryIndexById(key) {
    const tagObject = stateCopy.categories.findIndex((elem) => elem.key === key);
    return tagObject;
  }

  function getTagIndexById(key, groupIndex) {
    const tagObject = stateCopy.cardGroups[groupIndex].tags.findIndex((elem) => elem.key === key);
    return tagObject;
  }

  switch (action.type) {
    // ? Adding methods
    case "ADDCARDGROUP":
      const newCardGroup = new CardGroup(
        payload.name,
        payload.categoryName,
        payload.dateCreated,
        payload.dateModified,
        payload.sideColor,
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
        payload.sideColor,
        payload.key
      );
      stateCopy.cardGroups[payload.selectedGroup].cardsStored.push(newCard);
      save(stateCopy);
      console.log(stateCopy);
      break;
    case "ADDCATEGORY":
      const newCategory = new Category(payload.name, payload.sideColor, payload.key);
      stateCopy.categories.push(newCategory);
      save(stateCopy);
      break;
    case "ADDTAG":
      const newTag = new Tag(payload.name, payload.sideColor, payload.key);
      stateCopy.cardGroups[payload.selectedGroup].tags.push(newTag);
      save(stateCopy);
      break;

    // ? Removing methods
    case "REMOVECARDGROUP":
      const groupIndex = getGroupIndexById(payload.key);
      stateCopy.cardGroups.splice(groupIndex, 1);
      save(stateCopy);
      break;
    case "REMOVECARD":
      const cardIndex = getCardIndexById(payload.key, payload.groupIndex);
      stateCopy.cardGroups[payload.groupIndex].cardsStored.splice(cardIndex, 1);
      save(stateCopy);
      break;
    case "REMOVECATEGORY":
      const categoryIndex = getCategoryIndexById(payload.key);
      stateCopy.categories.splice(categoryIndex, 1);
      save(stateCopy);
      break;
    case "REMOVETAG":
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const tagGroupIndex = getGroupIndexById(id);
      const tagIndex = getTagIndexById(payload.key, tagGroupIndex);

      stateCopy.cardGroups[tagGroupIndex].tags.splice(tagIndex, 1);
      save(stateCopy);
      break;
  }
  return stateCopy;
}

// ? Main Component
export default function DataContextComponent({children}) {
  const [dataState, dataDispatch] = useReducer(
    mainDataReducer,
    JSON.parse(localStorage.getItem("mainData")) || {
      categories: [{name: "None", sideColor: "transparent", key: "N"}],
      cardGroups: [],
    }
  );

  function getGroupIndexById(key) {
    const groupIndex = dataState.cardGroups.findIndex((elem) => elem.key === key);
    return groupIndex;
  }

  function getCategoryObjectByName(categoryName) {
    const tagObject = dataState.categories.find((elem) => elem.name === categoryName);
    return tagObject;
  }

  function getTagObjectByName(tagName) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const groupIndex = getGroupIndexById(id);
    const tagObject = dataState.cardGroups[groupIndex].tags.find((elem) => elem.name === tagName);
    return tagObject;
  }

  function addCardGroup(name, categoryName, dateCreated, dateModified) {
    const key = Math.random().toString(36).slice(2, -1);
    const category = getCategoryObjectByName(categoryName);
    dataDispatch({
      type: "ADDCARDGROUP",
      payload: {
        name,
        categoryName,
        dateCreated,
        dateModified,
        sideColor: category.sideColor,
        key,
      },
    });
  }

  function addCard(question, answer, tagName, dateCreated, dateModified, dateNextStudy) {
    const key = Math.random().toString(36).slice(2, -1);
    const tag = getTagObjectByName(tagName);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const groupIndex = getGroupIndexById(id);

    dataDispatch({
      type: "ADDCARD",
      payload: {
        question,
        answer,
        tagName,
        dateCreated,
        dateModified,
        dateNextStudy,
        selectedGroup: groupIndex,
        sideColor: tag.sideColor,
        key,
      },
    });
  }

  function addCategory(name, sideColor) {
    const key = Math.random().toString(36).slice(2, -1);
    dataDispatch({
      type: "ADDCATEGORY",
      payload: {
        name,
        sideColor,
        key,
      },
    });
  }

  function addTag(name, sideColor) {
    const key = Math.random().toString(36).slice(2, -1);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const groupIndex = getGroupIndexById(id);
    dataDispatch({
      type: "ADDTAG",
      payload: {
        name,
        sideColor,
        selectedGroup: groupIndex,
        key,
      },
    });
  }

  function removeCardGroup(key) {
    dataDispatch({
      type: "REMOVECARDGROUP",
      payload: {
        key,
      },
    });
  }
  function removeCard(key, groupIndex) {
    dataDispatch({
      type: "REMOVECARD",
      payload: {
        key,
        groupIndex,
      },
    });
  }
  function removeCategory(key) {
    dataDispatch({
      type: "REMOVECATEGORY",
      payload: {
        key,
      },
    });
  }
  function removeTag(key) {
    dataDispatch({
      type: "REMOVETAG",
      payload: {
        key,
      },
    });
  }

  const contextData = {
    dataState,
    getGroupIndexById,
    addCardGroup,
    addCard,
    addCategory,
    addTag,
    removeCardGroup,
    removeCard,
    removeCategory,
    removeTag,
  };
  return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>;
}

// TODO: When tag / category gets deleted, set card to None
// TODO: Date modified changes (Use util context to get current date)
// TODO: Return To Home If Group Id Desnt Exist
