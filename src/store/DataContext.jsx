import {createContext, useReducer, useRef, useState, useContext, useEffect} from "react";
import {UtilContext} from "./UtilContext";
import getSpacedRepetitionDays, {SRDays} from "./SpacedRepetitionFormat";
import {data} from "autoprefixer";
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
    this.perfectAmt = 0; // ? Amount of times user FULLY UNDERSTOOD in the quiz part. Back to 0 if didnt understand
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
  const d = new Date();
  const currentDateStr =
    [
      d.getFullYear(),
      (d.getMonth() + 1).toString().padStart(2, "0"),
      d.getDate().toString().padStart(2, "0"),
    ].join("/") +
    " " +
    [d.getHours().toString().padStart(2, "0"), d.getMinutes().toString().padStart(2, "0")].join(
      ":"
    );

  function save(data) {
    localStorage.setItem("mainData", JSON.stringify(data));
  }

  function getUrlId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return id;
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
        currentDateStr,
        currentDateStr,
        payload.sideColor,
        payload.key
      );
      stateCopy.cardGroups.unshift(newCardGroup);
      save(stateCopy);
      break;
    case "ADDCARD":
      const newCard = new Card(
        payload.question,
        payload.answer,
        payload.tag,
        currentDateStr,
        currentDateStr,
        [
          d.getFullYear(),
          (d.getMonth() + 1).toString().padStart(2, "0"),
          d.getDate().toString().padStart(2, "0"),
        ].join("/"),
        payload.sideColor,
        payload.key
      );
      stateCopy.cardGroups[payload.selectedGroup].cardsStored.unshift(newCard);
      stateCopy.cardGroups[payload.selectedGroup].dateModified = currentDateStr;
      save(stateCopy);
      break;
    case "ADDCATEGORY":
      const newCategory = new Category(payload.name, payload.sideColor, payload.key);
      stateCopy.categories.push(newCategory);
      save(stateCopy);
      break;
    case "ADDTAG":
      const newTag = new Tag(payload.name, payload.sideColor, payload.key);
      stateCopy.cardGroups[payload.selectedGroup].tags.push(newTag);
      stateCopy.cardGroups[payload.selectedGroup].dateModified = currentDateStr;
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
      stateCopy.cardGroups[payload.groupIndex].dateModified = currentDateStr;
      save(stateCopy);
      break;
    case "REMOVECATEGORY":
      const removeCategoryIndex = getCategoryIndexById(payload.key);
      const removeCategoryObj = stateCopy.categories[removeCategoryIndex];
      stateCopy.cardGroups = stateCopy.cardGroups.map((elem) => {
        if (removeCategoryObj.name === elem.categoryName) {
          elem.categoryName = "None";
          elem.sideColor = "transparent";
          elem.dateModified = currentDateStr;
        }
        return elem;
      });
      stateCopy.categories.splice(removeCategoryIndex, 1);
      save(stateCopy);
      break;
    case "REMOVETAG":
      const removeTagGroupIndex = getGroupIndexById(getUrlId());
      const removeTagIndex = getTagIndexById(payload.key, removeTagGroupIndex);
      const removeTagObj = stateCopy.cardGroups[removeTagGroupIndex].tags[removeTagIndex];
      stateCopy.cardGroups[removeTagGroupIndex].cardsStored = stateCopy.cardGroups[
        removeTagGroupIndex
      ].cardsStored.map((elem) => {
        if (removeTagObj.name === elem.tag) {
          elem.tag = "None";
          elem.sideColor = "transparent";
          elem.dateModified = currentDateStr;
        }
        return elem;
      });

      stateCopy.cardGroups[removeTagGroupIndex].tags.splice(removeTagIndex, 1);
      stateCopy.cardGroups[removeTagGroupIndex].dateModified = currentDateStr;

      save(stateCopy);
      break;

    // ? Editing methods
    case "EDITCARDGROUP":
      const editGroupIndex = getGroupIndexById(payload.key);
      stateCopy.cardGroups[editGroupIndex].name = payload.name;
      stateCopy.cardGroups[editGroupIndex].categoryName = payload.categoryName;
      stateCopy.cardGroups[editGroupIndex].sideColor = payload.sideColor;
      stateCopy.cardGroups[editGroupIndex].dateModified = currentDateStr;

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
      stateCopy.cardGroups[payload.groupIndex].cardsStored[editCardIndex].dateModified =
        currentDateStr;
      stateCopy.cardGroups[payload.groupIndex].dateModified = currentDateStr;

      save(stateCopy);
      break;
    case "EDITCATEGORY":
      const editCategoryIndex = getCategoryIndexById(payload.key);
      const editCategoryObj = stateCopy.categories[editCategoryIndex];

      stateCopy.cardGroups = stateCopy.cardGroups.map((elem) => {
        if (editCategoryObj.name === elem.categoryName) {
          elem.categoryName = payload.name;
          elem.sideColor = payload.sideColor;
          elem.dateModified = currentDateStr;
        }
        return elem;
      });
      stateCopy.categories[editCategoryIndex].name = payload.name;
      stateCopy.categories[editCategoryIndex].sideColor = payload.sideColor;
      save(stateCopy);
      break;
    case "EDITTAG":
      const editTagGroupIndex = getGroupIndexById(payload.groupKey);
      const editTagIndex = getTagIndexById(payload.key, editTagGroupIndex);
      const editTagObj = stateCopy.cardGroups[editTagGroupIndex].tags[editTagIndex];
      stateCopy.cardGroups[editTagGroupIndex].cardsStored = stateCopy.cardGroups[
        editTagGroupIndex
      ].cardsStored.map((elem) => {
        if (editTagObj.name === elem.tag) {
          elem.tag = payload.name;
          elem.sideColor = payload.sideColor;
          elem.dateModified = currentDateStr;
        }
        return elem;
      });

      stateCopy.cardGroups[editTagGroupIndex].tags[editTagIndex].name = payload.name;
      stateCopy.cardGroups[editTagGroupIndex].tags[editTagIndex].sideColor = payload.sideColor;
      stateCopy.cardGroups[editTagGroupIndex].dateModified = currentDateStr;

      save(stateCopy);
      break;
  }
  return stateCopy;
}

// ? Main Component
export default function DataContextComponent({children}) {
  let [dataState, dataDispatch] = useReducer(
    mainDataReducer,
    JSON.parse(localStorage.getItem("mainData")) || {
      categories: [{name: "None", sideColor: "transparent", key: "N"}],
      cardGroups: [],
    }
  );

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkmode") || "false");
  const [showCardDates, setShowCardDates] = useState(
    localStorage.getItem("showCardDate") || "false"
  );
  const [showGroupDates, setShowGroupDates] = useState(
    localStorage.getItem("showGroupDate") || "true"
  );

  console.log(dataState);

  function getUrlId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return id;
  }
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
    const groupIndex = getGroupIndexById(getUrlId());
    const tagObject = dataState.cardGroups[groupIndex].tags.find((elem) => elem.key === key);
    return tagObject;
  }

  function getCategoryObjectByName(categoryName) {
    const tagObject = dataState.categories.find((elem) => elem.name === categoryName);
    return tagObject;
  }

  function getTagObjectByName(tagName) {
    const groupIndex = getGroupIndexById(getUrlId());
    const tagObject = dataState.cardGroups[groupIndex].tags.find((elem) => elem.name === tagName);
    return tagObject;
  }

  function getQuizCard() {
    // ? Get cards
    const groupIndex = getGroupIndexById(getUrlId());
    const cards = dataState.cardGroups[groupIndex].cardsStored;

    // ? Get Date
    const currentDate = new Date().getTime();
    const dueCards = [];
    // ? Get cards where their dateNextStudy has passed
    for (const card of cards) {
      const cardStudyDate = card.dateNextStudy;
      const cardStudyTime = new Date(cardStudyDate);
      if (currentDate >= cardStudyTime) {
        dueCards.push(card);
      }
    }
    if (dueCards.length <= 0) {
      return "empty";
    }
    const selectedQuizCard = dueCards[Math.floor(Math.random() * dueCards.length)];
    return selectedQuizCard;
  }

  function addCardGroup(name, categoryName) {
    const key = Math.random().toString(36).slice(2, -1);
    const category = getCategoryObjectByName(categoryName);
    dataDispatch({
      type: "ADDCARDGROUP",
      payload: {
        name,
        categoryName,
        sideColor: category.sideColor,
        key,
      },
    });
  }
  function addCard(question, answer, tagName) {
    const key = Math.random().toString(36).slice(2, -1);
    const tag = getTagObjectByName(tagName);
    const groupIndex = getGroupIndexById(getUrlId());

    dataDispatch({
      type: "ADDCARD",
      payload: {
        question,
        answer,
        tag: tagName,
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
    const groupIndex = getGroupIndexById(getUrlId());
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
    const groupIndex = getGroupIndexById(getUrlId());
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
    const id = getUrlId();
    dataDispatch({
      type: "EDITTAG",
      payload: {
        name,
        sideColor,
        key,
        groupKey: id,
      },
    });
  }

  function addCardStudyTime(key, proficiency) {
    const groupIndex = getGroupIndexById(getUrlId());
    const cardIndex = dataState.cardGroups[groupIndex].cardsStored.findIndex(
      (elem) => elem.key === key
    );
    const stateCopy = {...dataState};
    const currentDate = new Date().getTime();
    const cardPerfectAmt = stateCopy.cardGroups[groupIndex].cardsStored[cardIndex].perfectAmt;
    let nextDayAmt; // ? How many days you have to wait again until next quiz
    let nextDateObject;
    let newStudyDate;
    switch (proficiency) {
      case 0:
        newStudyDate = new Date().toISOString().replaceAll("-", "/").split("T")[0];
        stateCopy.cardGroups[groupIndex].cardsStored[cardIndex].perfectAmt = 0;

        break;
      case 1:
        nextDayAmt = getSpacedRepetitionDays(cardPerfectAmt - 1);
        nextDateObject = new Date(currentDate + 86400000 * nextDayAmt);
        newStudyDate = [
          nextDateObject.getFullYear(),
          (nextDateObject.getMonth() + 1).toString().padStart(2, "0"),
          nextDateObject.getDate().toString().padStart(2, "0"),
        ].join("/");

        if (cardPerfectAmt - 1 <= 0) {
          stateCopy.cardGroups[groupIndex].cardsStored[cardIndex].perfectAmt = 0;
        } else {
          stateCopy.cardGroups[groupIndex].cardsStored[cardIndex].perfectAmt--;
        }
        break;
      case 2:
        nextDayAmt = getSpacedRepetitionDays(cardPerfectAmt);
        nextDateObject = new Date(currentDate + 86400000 * nextDayAmt);
        newStudyDate = [
          nextDateObject.getFullYear(),
          (nextDateObject.getMonth() + 1).toString().padStart(2, "0"),
          nextDateObject.getDate().toString().padStart(2, "0"),
        ].join("/");

        if (cardPerfectAmt + 1 >= SRDays.length) {
          stateCopy.cardGroups[groupIndex].cardsStored[cardIndex].perfectAmt = SRDays.length - 1;
        } else {
          stateCopy.cardGroups[groupIndex].cardsStored[cardIndex].perfectAmt++;
        }

        break;
    }
    stateCopy.cardGroups[groupIndex].cardsStored[cardIndex].dateNextStudy = newStudyDate;

    localStorage.setItem("mainData", JSON.stringify(stateCopy));
    dataState = stateCopy;
  }

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const alteredData = prev === "true" ? "false" : "true";
      localStorage.setItem("darkmode", alteredData);
      return darkMode === "true" ? "false" : "true";
    });
  }

  function toggleShowCardDate() {
    setShowCardDates((prev) => {
      const alteredData = prev === "true" ? "false" : "true";
      localStorage.setItem("showCardDate", alteredData);
      console.log(localStorage.getItem("showCardDate"));
      return alteredData;
    });
  }

  function toggleShowGroupDate() {
    setShowGroupDates((prev) => {
      const alteredData = prev === "true" ? "false" : "true";
      localStorage.setItem("showGroupdDate", alteredData);
      console.log(localStorage.getItem("showGroupdDate"));
      return alteredData;
    });
  }

  const contextData = {
    dataState,
    getGroupIndexById,
    getCardObj,
    getCategoryObjectById,
    getTagObjectById,
    getQuizCard,
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
    addCardStudyTime,
    darkMode,
    toggleDarkMode,
    showCardDates,
    toggleShowCardDate,
    showGroupDates,
    toggleShowGroupDate,
  };
  return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>;
}

// TODO: Quiz Part
//    TODO: Quiz Tag Filter
//    TODO: Restart Space Repetition back to 0 (NOT "I dont understand it")

// TODO: Filter Feature
//    TODO: Fix Card Filter (It says group lmao)

// TODO: Logo and favicon
// TODO: Testing
//    TODO: Responsiveness In Mobile
//    TODO: Date Bugs
//    TODO: Ui Bugs
//    TODO: Unexpected Behaviors
//    TODO: Url Bugs

// TODO: Release ✨
