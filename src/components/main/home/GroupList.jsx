import GroupListElem from "./GroupListElem";
export default function GroupList() {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-2 ">
      <GroupListElem sideColor="cornflowerblue" />
      <GroupListElem sideColor="red" />
      <GroupListElem sideColor="yellow" />
      <GroupListElem sideColor="purple" />
    </div>
  );
}
