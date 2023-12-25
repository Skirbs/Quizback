import Header from "../../reusable/Header";
import CardOptions from "../../reusable/CardOptions";
import PageActions from "../../reusable/PageActions";
import GroupList from "./GroupList";
import Filter from "./filter";
import Dialog from "../../reusable/Dialog";
export default function Home() {
  const createDialogRef = useRef();
  return (
    <main className="w-[95%] p-3">
      <Header title="Your Card Groups" />
      <PageActions />
      <CardOptions />
      <GroupList />
    </main>
  );
}
