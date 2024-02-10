import {useRef} from "react";
import Button from "./Button";
import {Link} from "react-router-dom";

export default function PageActions({isCardGroup, onCreate, onList}) {
  const actionsRef = useRef();

  function toggleView() {
    actionsRef.current.classList.toggle("[&>*]:top-0");
    actionsRef.current.classList.toggle("[&>*]:opacity-100");
    actionsRef.current.classList.toggle("[&>*]:opacity-0");
    actionsRef.current.classList.toggle("[&>*]:ease-bounce");
    actionsRef.current.classList.toggle("[&>*]:ease-out");
  }

  function GroupListAction() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    return (
      <>
        <Button
          onClick={onCreate}
          className="w-[3rem] h-[3rem] absolute inset-x-0 -top-[3.2rem] [&>p]:opacity-0 [&>p]:hover:opacity-100"
          noOpacityChange>
          <span className="text-3xl material-symbols-outlined">add</span>
          <p className="absolute w-fit h-[2rem] top-[0.5rem] right-[3.25rem] overflow-hidden p-2 rounded-md bg-white dark:bg-neutral-800 whitespace-nowrap pointer-events-none flex items-center transition-all">
            Create Card
          </p>
        </Button>
        <Button
          onClick={onList}
          className="w-[3rem] h-[3rem] absolute inset-x-0 -top-[6.4rem] [&>p]:opacity-0 [&>p]:hover:opacity-100"
          noOpacityChange>
          <span className="text-3xl material-symbols-outlined">format_list_bulleted</span>
          <p className="absolute w-fit h-[2rem] top-[0.5rem] right-[3.25rem] overflow-hidden p-2 rounded-md bg-white dark:bg-neutral-800 whitespace-nowrap pointer-events-none flex items-center transition-all">
            Tag Lists
          </p>
        </Button>
        <Link
          to={`/Quizback/quiz?id=${id}`}
          className="bg-white dark:bg-neutral-800 drop-shadow-md rounded-full flex-center w-[3rem] h-[3rem] absolute inset-x-0 -top-[9.6rem] [&>p]:opacity-0 [&>p]:hover:opacity-100">
          <span className="text-3xl material-symbols-outlined">quiz</span>
          <p className="absolute h-[2rem] top-[0.5rem] right-[3.25rem] overflow-hidden p-2 rounded-md bg-white dark:bg-neutral-800 whitespace-nowrap pointer-events-none flex items-center">
            Quiz
          </p>
        </Link>
      </>
    );
  }

  function CardGroupAction() {
    return (
      <>
        <Button
          onClick={onCreate}
          className="w-[3rem] h-[3rem] absolute inset-x-0 -top-[3.2rem] [&>p]:opacity-0 [&>p]:hover:opacity-100"
          noOpacityChange>
          <span className="text-3xl material-symbols-outlined">add</span>
          <p className="absolute h-[2rem] top-[0.5rem] right-[3.25rem] overflow-hidden p-2 rounded-md bg-white dark:bg-neutral-800 whitespace-nowrap pointer-events-none flex items-center transition-all">
            Create Group
          </p>
        </Button>
        <Button
          onClick={onList}
          className="w-[3rem] h-[3rem] absolute inset-x-0 -top-[6.4rem] [&>p]:opacity-0 [&>p]:hover:opacity-100"
          noOpacityChange>
          <span className="text-3xl material-symbols-outlined">format_list_bulleted</span>
          <p className="absolute w-fit h-[2rem] top-[0.5rem] right-[3.25rem] overflow-hidden p-2 rounded-md bg-white dark:bg-neutral-800 whitespace-nowrap pointer-events-none flex items-center transition-all">
            Category Lists
          </p>
        </Button>
      </>
    );
  }

  return (
    <div
      ref={actionsRef}
      className="fixed z-20 right-4 bottom-4 [&:nth-child(0)]:opacity-25 [&>*]:top-0 [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-out [&>*]:opacity-0">
      <Button onClick={toggleView} className="w-[3rem] h-[3rem] z-20 relative !opacity-100">
        <span className="text-3xl material-symbols-outlined">expand_less</span>
      </Button>
      {isCardGroup ? <GroupListAction /> : <CardGroupAction />}
    </div>
  );
}
