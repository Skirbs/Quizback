import {useRef, useContext, useState, useEffect} from "react";
import Header from "../../reusable/Header";
import CardOptions from "../../reusable/CardOptions";
import CardGroupList from "./CardGroupList";
import PageActions from "../../reusable/PageActions";
import GoBack from "../../reusable/GoBack";
import CreateCardDialog from "./CreateCardDialog";
import CreateCategorizationDialog from "../../reusable/CreateCategorizationDialog";
import CategorizationListDialog from "../../reusable/categorization_list/CategorizationListDialog";
import {DataContext} from "../../../store/DataContext";
import {Navigate} from "react-router-dom";
import FilterDialog from "../../reusable/filter/FilterDialog";
import sortDisplay from "../../reusable/sortdisplay";
export default function CardGroup() {
  const dataCtx = useContext(DataContext);
  const createDialogRef = useRef();
  const createTagRef = useRef();
  const tagListRef = useRef();

  const filterDialogRef = useRef();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const selectedGroup = dataCtx.getGroupIndexById(id);
  if (selectedGroup === -1) {
    return <Navigate to="/" />;
  }

  const [displayCards, setDisplayCards] = useState([]);
  const currentFilter = useRef([]);
  const currentSort = useRef("date-modified-ascending");
  useEffect(() => {
    setDisplayCards(() => {
      // ? Get Cards Filtered Via Tags
      let filteredCards;
      if (currentFilter.current.length === 0) {
        filteredCards = dataCtx.dataState.cardGroups[selectedGroup].cardsStored;
      } else {
        filteredCards = dataCtx.dataState.cardGroups[selectedGroup].cardsStored.filter((elem) => {
          for (const tag of currentFilter.current) {
            if (elem.tag === tag) {
              return true;
            }
          }
          return false;
        });
      }

      // ? Sort Filtered Cards
      let sortedCards = sortDisplay(currentSort.current, filteredCards);

      return sortedCards;
    });
  }, [dataCtx.dataState]);

  function createDialogHandler() {
    createDialogRef.current.open();
  }
  function createTagHandler() {
    createTagRef.current.open();
  }
  function filterDialogHandler() {
    filterDialogRef.current.open();
  }
  function tagListHandler() {
    tagListRef.current.open();
  }

  function applyFilterHandler(tags) {
    currentFilter.current = tags;

    if (tags.length === 0) {
      const sortedCards = sortDisplay(
        currentSort.current,
        dataCtx.dataState.cardGroups[selectedGroup].cardsStored
      );
      setDisplayCards(sortedCards);
      return;
    }

    const filteredCards = dataCtx.dataState.cardGroups[selectedGroup].cardsStored.filter((elem) => {
      for (const tag of tags) {
        if (elem.tag === tag) {
          return true;
        }
      }
      return false;
    });
    const sortedCards = sortDisplay(currentSort.current, filteredCards);
    setDisplayCards(sortedCards);
  }

  function sortHandler(e) {
    setDisplayCards((elem) => sortDisplay(e.target.value, elem));
    currentSort.current = e.target.value;
  }

  return (
    <>
      <CreateCardDialog
        ref={createDialogRef}
        selectedGroup={selectedGroup}
        onTag={createTagHandler}
      />
      <CreateCategorizationDialog
        ref={createTagRef}
        selectedGroup={selectedGroup}
        header="Create Tag"
        type="Tag"
      />
      <FilterDialog
        ref={filterDialogRef}
        header="Filter Tags"
        type="Tags"
        selectedGroup={selectedGroup}
        onApplyFilter={applyFilterHandler}
      />

      <CategorizationListDialog
        ref={tagListRef}
        selectedGroup={selectedGroup}
        header="Tag Lists"
        type="Tag"
      />
      <main className="w-[95%] p-3">
        <Header title={`${dataCtx.dataState.cardGroups[selectedGroup].name} Cards`} />
        <CardOptions openFilterHandler={filterDialogHandler} onSort={sortHandler} type="Cards" />
        <PageActions isCardGroup onCreate={createDialogHandler} onList={tagListHandler} />
        <GoBack to="/" />
        <CardGroupList selectedGroup={selectedGroup} displayCards={displayCards} />
      </main>
    </>
  );
}
