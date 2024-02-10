import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {DataContext} from "../../../store/DataContext";
import CardQuizElem from "./CardQuizElem";
import CardQuizOptions from "./CardQuizOptions";
import FinishedQuizPopup from "./FinishedQuizPopup";
import CreateCategorizationDialog from "../../reusable/CreateCategorizationDialog";
import CreateCardDialog from "../card_group/CreateCardDialog";
import DeleteDialog from "../../reusable/DeleteDialog";
import {Navigate} from "react-router-dom";
export default function CardQuiz() {
  const dataCtx = useContext(DataContext);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const selectedGroup = dataCtx.getGroupIndexById(id);
  if (selectedGroup === -1) {
    return <Navigate to="/" />;
  }

  const [, forceRefresh] = useReducer((x) => x + 1, 0);
  const [dueCards, setDueCards] = useState(dataCtx.getQuizCard());
  const [editMode, setEditMode] = useState(false);
  const hasAnswered = useRef(false);
  const cardDiv = useRef();
  const cardElem = useRef();
  const deleteDialog = useRef();

  function nextCardHandler(proficiency) {
    if (hasAnswered.current) return;
    // ? Proficiency
    //  ? (0 => not understood)
    //  ? (1 => quite understood)
    //  ? (2 => fully understood)
    cardElem.current.classList.add("animate-fade-away-up");
    hasAnswered.current = true;
    dataCtx.addCardStudyTime(dueCards.key, proficiency);

    setTimeout(() => {
      setDueCards(dataCtx.getQuizCard());

      cardElem.current.classList.remove("animate-fade-away-up");

      setTimeout(() => {
        hasAnswered.current = false;
      }, 100);
    }, 400);
  }

  function openDeleteDialogHandle(name, key) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const selectedGroup = dataCtx.getGroupIndexById(id);

    deleteDialog.current.changeData(name, key, selectedGroup);
    deleteDialog.current.open();
  }

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
          editKey={dueCards.key}
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
    <div className="flex mt-3 w-fit">
      <div className="flex-col justify-start w-full gap-3 flex-center">
        {dueCards === "empty" ? (
          <FinishedQuizPopup />
        ) : (
          <>
            <DeleteDialog
              ref={deleteDialog}
              onAfterDelete={() => {
                nextCardHandler();
              }}
              isCard
            />
            {editMode && <EditDialog />}

            <div
              ref={cardDiv}
              style={{left: "0vw"}}
              className="flex self-start w-0 gap-2 mt-5 transition-all">
              <div ref={cardElem} className="min-w-[75vw] w-[75vw] self-center">
                <CardQuizElem
                  sideColor={dueCards.sideColor}
                  data={dueCards}
                  key={dueCards.key}
                  onEdit={setEditMode}
                  onOpenDeleteDialog={openDeleteDialogHandle}
                />
              </div>
            </div>
            <CardQuizOptions onNextCard={nextCardHandler} cardPerfectAmt={dueCards.perfectAmt} />
          </>
        )}
      </div>
    </div>
  );
}
