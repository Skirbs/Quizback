import ActionOptions from "./ActionOptions";
import GroupAction from "./GroupAction";
import GroupList from "./GroupList";
import Filter from "./filter";
export default function Home() {
  return (
    <main className="w-[95%] p-3">
      <h2 className="text-center text-4xl font-semibold drop-shadow-lg bg-white dark:bg-neutral-800 p-2 rounded-lg">
        Your List
      </h2>
      <GroupAction />
      <ActionOptions />
      <GroupList />
    </main>
  );
}
