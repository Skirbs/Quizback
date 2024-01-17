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
export default function CardGroup() {
  const dataCtx = useContext(DataContext);
  const createDialogRef = useRef();
  const createTagRef = useRef();
  const tagListRef = useRef();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const selectedGroup = dataCtx.getGroupIndexById(id);

  function createDialogHandler() {
    createDialogRef.current.open();
  }
  function createTagHandler() {
    createTagRef.current.open();
  }
  function tagListHandler() {
    tagListRef.current.open();
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
      <CategorizationListDialog
        ref={tagListRef}
        selectedGroup={selectedGroup}
        header="Tag Lists"
        type="Tag"
      />
      <main className="w-[95%] p-3">
        <Header title={`${dataCtx.dataState.cardGroups[selectedGroup].name} Cards`} />
        <CardOptions />
        <PageActions isCardGroup onCreate={createDialogHandler} onList={tagListHandler} />
        <GoBack to="/" />
        <CardGroupList selectedGroup={selectedGroup} />
      </main>
    </>
  );

  //TODO: Dynamically Change Header Title name
}
