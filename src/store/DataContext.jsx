import {createContext, useReducer, useRef, useState} from "react";
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
  let stateCopy = {...state};
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
      const removeGroupIndex = getGroupIndexById(payload.key);
      stateCopy.cardGroups.splice(removeGroupIndex, 1);
      save(stateCopy);
      break;
    case "REMOVECARD":
      const removeCardIndex = getCardIndexById(payload.key, payload.groupIndex);
      stateCopy.cardGroups[payload.groupIndex].cardsStored.splice(removeCardIndex, 1);
      save(stateCopy);
      break;
    case "REMOVECATEGORY":
      const removeCategoryIndex = getCategoryIndexById(payload.key);
      const removeCategoryObj = stateCopy.categories[removeCategoryIndex];
      stateCopy.cardGroups = stateCopy.cardGroups.map((elem) => {
        if (removeCategoryObj.name === elem.categoryName) {
          elem.categoryName = "None";
          elem.sideColor = "transparent";
        }
        return elem;
      });
      stateCopy.categories.splice(removeCategoryIndex, 1);
      save(stateCopy);
      break;
    case "REMOVETAG":
      const removeUrlParams = new URLSearchParams(window.location.search);
      const removeTagId = removeUrlParams.get("id");
      const removeTagGroupIndex = getGroupIndexById(removeTagId);
      const removeTagIndex = getTagIndexById(payload.key, removeTagGroupIndex);
      const removeTagObj = stateCopy.cardGroups[removeTagGroupIndex].tags[removeTagIndex];
      stateCopy.cardGroups[removeTagGroupIndex].cardsStored = stateCopy.cardGroups[
        removeTagGroupIndex
      ].cardsStored.map((elem) => {
        if (removeTagObj.name === elem.tag) {
          elem.tag = "None";
          elem.sideColor = "transparent";
        }
        return elem;
      });

      stateCopy.cardGroups[removeTagGroupIndex].tags.splice(removeTagIndex, 1);
      save(stateCopy);
      break;

    case "EDITCARDGROUP":
      const editGroupIndex = getGroupIndexById(payload.key);
      stateCopy.cardGroups[editGroupIndex].name = payload.name;
      stateCopy.cardGroups[editGroupIndex].categoryName = payload.categoryName;
      stateCopy.cardGroups[editGroupIndex].sideColor = payload.sideColor;
      save(stateCopy);
      break;
    case "EDITCARD":
      const editCardIndex = getCardIndexById(payload.key, payload.groupIndex);
      stateCopy.cardGroups[payload.groupIndex].cardsStored[editCardIndex].question =
        payload.question;
      stateCopy.cardGroups[payload.groupIndex].cardsStored[editCardIndex].answer = payload.answer;
      stateCopy.cardGroups[payload.groupIndex].cardsStored[editCardIndex].tag = payload.tag.name;
      stateCopy.cardGroups[payload.groupIndex].cardsStored[editCardIndex].sideColor =
        payload.tag.sideColor;
      save(stateCopy);
      break;
    case "EDITCATEGORY":
      const editCategoryIndex = getCategoryIndexById(payload.key);
      const editCategoryObj = stateCopy.categories[editCategoryIndex];

      stateCopy.cardGroups = stateCopy.cardGroups.map((elem) => {
        if (editCategoryObj.name === elem.categoryName) {
          elem.categoryName = payload.name;
          elem.sideColor = payload.sideColor;
        }
        return elem;
      });
      stateCopy.categories[editCategoryIndex].name = payload.name;
      stateCopy.categories[editCategoryIndex].sideColor = payload.sideColor;
      save(stateCopy);
      break;
    case "EDITTAG":
      const editUrlParams = new URLSearchParams(window.location.search);
      const editTagId = editUrlParams.get("id");
      const editTagGroupIndex = getGroupIndexById(editTagId);
      const editTagIndex = getTagIndexById(payload.key, editTagGroupIndex);
      const editTagObj = stateCopy.cardGroups[editTagGroupIndex].tags[editTagIndex];
      stateCopy.cardGroups[editTagGroupIndex].cardsStored = stateCopy.cardGroups[
        editTagGroupIndex
      ].cardsStored.map((elem) => {
        if (editTagObj.name === elem.tag) {
          elem.tag = payload.name;
          elem.sideColor = payload.sideColor;
        }
        return elem;
      });

      stateCopy.cardGroups[editTagGroupIndex].tags[editTagIndex].name = payload.name;
      stateCopy.cardGroups[editTagGroupIndex].tags[editTagIndex].sideColor = payload.sideColor;
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

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkmode") || "false");
  function getGroupIndexById(key) {
    const groupIndex = dataState.cardGroups.findIndex((elem) => elem.key === key);
    return groupIndex;
  }

  function getCardObj(key, groupIndex) {
    const cardObj = dataState.cardGroups[groupIndex].cardsStored.find((elem) => {
      return elem.key === key;
    });
    return cardObj;
  }

  function getCategoryObjectById(key) {
    const tagObject = dataState.categories.find((elem) => elem.key === key);
    return tagObject;
  }

  function getTagObjectById(key) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const groupIndex = getGroupIndexById(id);
    const tagObject = dataState.cardGroups[groupIndex].tags.find((elem) => elem.key === key);
    return tagObject;
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
        tag: tagName,
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

  function editCardGroup(name, categoryName, key) {
    const category = getCategoryObjectByName(categoryName);
    dataDispatch({
      type: "EDITCARDGROUP",
      payload: {
        name,
        categoryName,
        key,
        sideColor: category.sideColor,
      },
    });
  }
  function editCard(question, answer, tagName, key) {
    const tag = getTagObjectByName(tagName);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const groupIndex = getGroupIndexById(id);
    dataDispatch({
      type: "EDITCARD",
      payload: {
        question,
        answer,
        tag,
        key,
        groupIndex,
      },
    });
  }
  function editCategory(name, sideColor, key) {
    dataDispatch({
      type: "EDITCATEGORY",
      payload: {
        name,
        sideColor,
        key,
      },
    });
  }
  function editTag(name, sideColor, key) {
    dataDispatch({
      type: "EDITTAG",
      payload: {
        name,
        sideColor,
        key,
      },
    });
  }

  async function toggleDarkMode() {
    await setDarkMode((prev) => {
      return !prev;
    });
    console.log(darkMode);
    localStorage.setItem("darkmode", darkMode === "true" ? "false" : "true");
  }

  const contextData = {
    dataState,
    getGroupIndexById,
    getCardObj,
    getCategoryObjectById,
    getTagObjectById,
    addCardGroup,
    addCard,
    addCategory,
    addTag,
    removeCardGroup,
    removeCard,
    removeCategory,
    removeTag,
    editCardGroup,
    editCard,
    editCategory,
    editTag,
    darkMode,
    toggleDarkMode,
  };
  return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>;
}

// TODO: Design the delete dialog better

// TODO: Date modified changes (Use util context to get current date)
//  TODO: Groups
//   TODO: Adding Cards
//   TODO: Editing Cards
//   TODO: Adding Categorization
//   TODO: Editing Categorization
//  TODO: Cards
//   TODO: Editing Cards
//   TODO: Editing Categorization Of Card

// TODO: Quiz Part

// TODO: Logo
