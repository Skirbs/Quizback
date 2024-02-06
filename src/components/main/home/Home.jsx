import {useContext, useEffect, useRef, useState} from "react";
import Header from "../../reusable/Header";
import CardOptions from "../../reusable/CardOptions";
import PageActions from "../../reusable/PageActions";
import GroupList from "./GroupList";
import Filter from "./filter";
import CreateGroupDialog from "./CreateGroupDialog";
import CreateCategorizationDialog from "../../reusable/CreateCategorizationDialog";
import CategorizationListDialog from "../../reusable/categorization_list/CategorizationListDialog";
import FilterDialog from "../../reusable/filter/FilterDialog";
import {DataContext} from "../../../store/DataContext";
import sortDisplay from "../../reusable/sortdisplay";
export default function Home() {
  const dataCtx = useContext(DataContext);
  const [displayGroup, setDisplayGroup] = useState();
  useEffect(() => {
    setDisplayGroup(() => {
      return dataCtx.dataState.cardGroups;
    });
  }, [dataCtx.dataState]);
  // ? Dialog Handlers
  const createDialogRef = useRef();
  const createCategoryRef = useRef();
  const categoryListRef = useRef();
  const filterDialogRef = useRef();

  // ? Dialog UI Methods
  function openCreateHandler() {
    createDialogRef.current.open();
  }

  function openCategoryHandler() {
    createCategoryRef.current.open();
  }

  function categoryListHandler() {
    categoryListRef.current.open();
  }

  function filterDialogHandler() {
    filterDialogRef.current.open();
  }

  function applyFilterHandler(categories) {
    if (categories.length === 0) {
      setDisplayGroup(dataCtx.dataState.cardGroups);
      return;
    }

    setDisplayGroup(
      dataCtx.dataState.cardGroups.filter((elem) => {
        for (const category of categories) {
          if (elem.categoryName === category) {
            return true;
          }
        }
        return false;
      })
    );
  }

  function sortHandler(e) {
    setDisplayGroup((elem) => sortDisplay(e.target.value, elem));
  }

  return (
    <>
      <CreateGroupDialog ref={createDialogRef} onCategory={openCategoryHandler} />
      <CreateCategorizationDialog
        ref={createCategoryRef}
        header="Create Category"
        type="Category"
      />
      <FilterDialog
        ref={filterDialogRef}
        header="Filter Categories"
        type="Category"
        onApplyFilter={applyFilterHandler}
      />
      <CategorizationListDialog ref={categoryListRef} header="Category List" type="Category" />

      <main className="w-[95%] p-3">
        <Header title="Your Card Groups" />
        <PageActions onCreate={openCreateHandler} onList={categoryListHandler} />
        <CardOptions openFilterHandler={filterDialogHandler} onSort={sortHandler} type="Category" />
        <GroupList displayGroup={displayGroup} />
      </main>
    </>
  );
}
