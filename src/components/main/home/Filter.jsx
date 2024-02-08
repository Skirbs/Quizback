import Button from "../../reusable/Button";
export default function Filter({onOpenFilter}) {
  return (
    <Button onClick={onOpenFilter} className="after:content-['Filter'] tooltip">
      <span className="material-symbols-outlined flex-center">filter_list</span>
    </Button>
  );
}
