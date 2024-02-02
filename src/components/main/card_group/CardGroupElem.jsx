import {useContext, useEffect, useRef, useState} from "react";
import {UtilContext} from "../../../store/UtilContext";
import {DataContext} from "../../../store/DataContext";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
import CreateCardDialog from "./CreateCardDialog";
import CreateCategorizationDialog from "../../reusable/CreateCategorizationDialog";
export default function CardGroupElem({data, index, onOpenDeleteDialog, ...props}) {
  const utilCtx = useContext(UtilContext);
  const dataCtx = useContext(DataContext);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const settingRef = useRef();
  const cardRef = useRef();

  function setSettingVisibility(visible) {
    if (visible) {
      settingRef.current.classList.add("opacity-100");
      settingRef.current.classList.remove("opacity-0");
      settingRef.current.classList.remove("pointer-events-none");
    } else {
      settingRef.current.classList.remove("opacity-100");
      settingRef.current.classList.add("opacity-0");
      settingRef.current.classList.add("pointer-events-none");
    }
  }

  useEffect(() => {
    function clickOutsideHandler(event) {
      if (settingRef.current && !settingRef.current.contains(event.target)) {
        setSettingVisibility(false);
      }
    }
    document.addEventListener("click", clickOutsideHandler, true);
  });

  function showAnswerHandler() {
    setTimeout(() => {
      setShowAnswer((prev) => !prev);
    }, 120);

    // ? Code below repeats the animation
    cardRef.current.classList.remove("animate-scale-in-out-vertical");
    setTimeout(() => {
      cardRef.current.classList.add("animate-scale-in-out-vertical");
    }, 10);
  }

  useEffect(() => {
    setTimeout(() => {
      try {
        cardRef.current.style.animationDelay = "0s";
        cardRef.current.classList.remove("animate-fade-up-bounce");
      } catch {}
    }, 200 * (index + 1));
  });

  function EditDialog() {
    const editDialogRef = useRef();
    useEffect(() => {
      editDialogRef.current.open();
    });
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const selectedGroup = dataCtx.getGroupIndexById(id);

    const createTagRef = useRef();
    function createTagHandler() {
      createTagRef.current.open();
    }
    return (
      <>
        <CreateCategorizationDialog
          ref={createTagRef}
          selectedGroup={selectedGroup}
          header="Create Tag"
          type="Tag"
        />
        <CreateCardDialog
          editMode
          editKey={data.key}
          selectedGroup={selectedGroup}
          onClose={() => {
            setEditMode(false);
          }}
          ref={editDialogRef}
          onTag={createTagHandler}
        />
      </>
    );
  }
  return (
    <>
      {editMode && <EditDialog />}
      <Card
        ref={cardRef}
        className={`flex flex-col cursor-pointer hover:drop-shadow-lg transition-transform active:bg-neutral-50 relative w-[300px] py-3 !px-2 gap-0 dark:bg-neutral-800 hover:-translate-y-1 animate-fade-up-bounce`}
        onClick={(e) => {
          e.preventDefault();
          showAnswerHandler();
        }}
        {...props}>
        <span
          style={{backgroundColor: `${data.sideColor}`}}
          className="absolute w-1 left-0 inset-y-0 rounded-full"
        />

        <div className="flex-1 flex-center flex-col">
          {!showAnswer ? (
            <>
              <h2 className="break-words text-2xl text-center font-semibold">Question</h2>
              <p className="font-medium text-center w-full break-words inline-block flex-1 flex-center">
                {utilCtx.truncateString(`${data.question}`, 40)}
              </p>
            </>
          ) : (
            <>
              <h2 className="break-words text-2xl text-center font-semibold">Answer</h2>
              <p className="font-medium text-center w-full break-all inline-block flex-1 flex-center">
                {utilCtx.truncateString(`${data.answer}`, 45)}
              </p>
            </>
          )}
        </div>

        {dataCtx.showCardDates === "true" && (
          <div className="self-start mt-2 w-full flex-center gap-3">
            <p className="text-xs opacity-80 text-center whitespace-nowrap">
              Quiz Study Date:
              <br /> {data.dateNextStudy}
            </p>
            <p className="text-xs opacity-80 text-center whitespace-nowrap">
              Date Modified:
              <br /> {data.dateModified}
            </p>
            <p className="text-xs opacity-80 text-center whitespace-nowrap">
              Date Added: <br /> {data.dateCreated}
            </p>
          </div>
        )}

        <button
          className="absolute right-2 top-2 z-10"
          onClick={(e) => {
            e.stopPropagation();
            setSettingVisibility(true);
          }}>
          <span className="material-symbols-outlined">settings</span>
        </button>
        <Card
          ref={settingRef}
          className="absolute right-2 top-1 h-fit z-50 drop-shadow-2xl flex flex-col !p-0 overflow-hidden transition-all opacity-0 pointer-events-none">
          <Button
            className="!drop-shadow-none flex-1 flex justify-center mt-2 z-50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditMode(true);
            }}>
            <span className="material-symbols-outlined">edit</span>
            edit
          </Button>
          <Button
            className="!drop-shadow-none flex-1 flex justify-center mb-2"
            onClick={(e) => {
              e.preventDefault();
              onOpenDeleteDialog(data.question, data.key);
            }}>
            <span className="material-symbols-outlined">delete</span>
            delete
          </Button>
        </Card>
      </Card>
    </>
  );
}
