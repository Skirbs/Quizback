import {useEffect, useRef} from "react";
import Header from "../../reusable/Header";
import CardOptions from "../../reusable/CardOptions";
import PageActions from "../../reusable/PageActions";
import GroupList from "./GroupList";
import Filter from "./filter";
import CreateGroupDialog from "./CreateGroupDialog";
import CreateCategorizationDialog from "../../reusable/CreateCategorizationDialog";
import CategorizationListDialog from "../../reusable/categorization_list/CategorizationListDialog";
export default function Home() {
  const createDialogRef = useRef();
  const createCategoryRef = useRef();
  const categoryListRef = useRef();
  function openCreateHandler() {
    createDialogRef.current.open();
  }

  function openCategoryHandler() {
    createCategoryRef.current.open();
  }

  function categoryListHandler() {
    categoryListRef.current.open();
  }

  return (
    <>
      <CreateGroupDialog ref={createDialogRef} onCategory={openCategoryHandler} />
      <CreateCategorizationDialog
        ref={createCategoryRef}
        header="Create Category"
        type="Category"
      />
      <CategorizationListDialog ref={categoryListRef} header="Category List" type="Category" />

      <main className="w-[95%] p-3">
        <Header title="Your Card Groups" />
        <PageActions onCreate={openCreateHandler} onList={categoryListHandler} />
        <CardOptions />
        <GroupList />
      </main>
    </>
  );
}
