import Header from "../../reusable/Header";
import CardOptions from "../../reusable/CardOptions";
import CardGroupList from "./CardGroupList";
import PageActions from "../../reusable/PageActions";
export default function CardGroup() {
  return (
    <main className="w-[95%] p-3">
      <Header title={`${"Title"} Cards`} />
      <CardOptions />
      <PageActions isCardGroup />
      <CardGroupList />
    </main>
  );

  //TODO: Dynamically Change Header Title name
}
