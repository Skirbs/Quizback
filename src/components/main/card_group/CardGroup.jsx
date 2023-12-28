import Header from "../../reusable/Header";
import CardOptions from "../../reusable/CardOptions";
import CardGroupList from "./CardGroupList";
import PageActions from "../../reusable/PageActions";
import GoBack from "../../reusable/GoBack";
import CreateCardDialog from "./CreateCardDialog";
import CreateTagDialog from "./CreateTagDialog";
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
      <CreateTagDialog ref={createTagRef} />
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
