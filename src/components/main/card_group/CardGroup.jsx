import Header from "../../reusable/Header";
import CardOptions from "../../reusable/CardOptions";
import CardGroupList from "./CardGroupList";
import PageActions from "../../reusable/PageActions";
import GoBack from "../../reusable/GoBack";
import CreateCardDialog from "./CreateCardDialog";
import {useRef} from "react";
export default function CardGroup() {
  const createDialogRef = useRef();
  function createDialogHandler() {
    createDialogRef.current.open();
  }
  return (
    <>
      <CreateCardDialog ref={createDialogRef} />
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
