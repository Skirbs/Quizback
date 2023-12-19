import Header from "../../reusable/Header";
import ActionOptions from "../../reusable/ActionOptions";
import GroupAction from "./GroupAction";
import GroupList from "./GroupList";
import Filter from "./filter";
export default function Home() {
  return (
    <main className="w-[95%] p-3">
      <Header title="Your Card Groups" />
      <GroupAction />
      <ActionOptions />
      <GroupList />
    </main>
  );
}
