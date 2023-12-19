import Button from "./Button";

export default function PageActions() {
  return (
    <div className="fixed right-4 bottom-4">
      <Button className="w-[2.75rem] h-[2.75rem]">
        <span className="material-symbols-outlined text-3xl">expand_less</span>
      </Button>
    </div>
  );
}
