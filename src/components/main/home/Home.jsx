import ActionOptions from "./ActionOptions";
import GroupList from "./GroupList";
import Filter from "./filter";
export default function Home() {
  return (
    <main className="w-[95%] p-3">
      <ActionOptions />
      <GroupList />
    </main>
  );
}
