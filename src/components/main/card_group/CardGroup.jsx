import Header from "../../reusable/Header";
import CardOptions from "../../reusable/CardOptions";
import CardGroupList from "./CardGroupList";
import PageActions from "../../reusable/PageActions";
import GoBack from "../../reusable/GoBack";
import CreateCardDialog from "./CreateCardDialog";
import CreateCategorizationDialog from "../../reusable/CreateCategorizationDialog";
import {useRef} from "react";
export default function CardGroup() {
  const createDialogRef = useRef();
  const createTagRef = useRef();
  function createDialogHandler() {
    createDialogRef.current.open();
  }
  function createTagHandler() {
    createTagRef.current.open();
  }

  return (
    <>
      <CreateCardDialog ref={createDialogRef} onTag={createTagHandler} />
      <CreateCategorizationDialog ref={createTagRef} header="Create Tag" type="tag" />
      <main className="w-[95%] p-3">
        <Header title={`${"Title"} Cards`} />
        <CardOptions />
        <PageActions isCardGroup onCreate={createDialogHandler} />
        <GoBack to="/" />
        <CardGroupList />
      </main>
    </>
  );

  //TODO: Dynamically Change Header Title name
}
