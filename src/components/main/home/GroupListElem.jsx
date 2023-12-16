import Card from "../../reusable/Card";

// ? sideColor should be any css-compatible color
export default function GroupListElem({sideColor = "bg-black"}) {
  return (
    <Card
      className={`flex-center flex-col cursor-pointer hover:drop-shadow-lg transition-transform active:bg-neutral-50 relative py-3 pl-5 pr-16 dark:bg-neutral-800 hover:-translate-y-1`}
      onClick={(e) => {
        alert("123");
      }}>
      <span
        style={{backgroundColor: `${sideColor}`}}
        className="absolute w-1 left-0 inset-y-0 rounded-full"
      />
      <h2 className="text-left w-full text-4xl font-semibold">Title</h2>
      <div>
        <p className="text-base opacity-80">Date Modified: 12/12/12 12:12</p>
        <p className="text-base opacity-80">Date Added: 12/12/12 12:12</p>
      </div>
      <button
        className="absolute right-2 top-2 z-10"
        onClick={(e) => {
          alert("asdfj");
          e.stopPropagation();
        }}>
        <span className="material-symbols-outlined">settings</span>
      </button>
    </Card>
  );
}
