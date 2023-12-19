import Header from "../../reusable/Header";
import ActionOptions from "../../reusable/ActionOptions";
import CardGroupList from "./CardGroupList";
export default function CardGroup() {
  return (
    <main className="w-[95%] p-3">
      <Header title={`${"Title"} Cards`} />
      <ActionOptions />
      <CardGroupList />
    </main>
  );
}
