import {useRef, useEffect, useContext, useState} from "react";
import {UtilContext} from "../../../store/UtilContext";
import {DataContext} from "../../../store/DataContext";
import CreateGroupDialog from "./CreateGroupDialog";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
import {Link} from "react-router-dom";
import CreateCategorizationDialog from "../../reusable/CreateCategorizationDialog";
// ? sideColor should be any css-compatible color
export default function GroupListElem({data, onOpenDeleteDialog, ...props}) {
  const utilCtx = useContext(UtilContext);
  const dataCtx = useContext(DataContext);
  const [editMode, setEditMode] = useState(false);
  const settingRef = useRef();

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

  function EditDialog() {
    const editDialogRef = useRef();
    const createCategoryRef = useRef();
    function openCategoryHandler() {
      createCategoryRef.current.open();
    }
    useEffect(() => {
      editDialogRef.current.open();
    });
    return (
      <>
        <CreateCategorizationDialog
          ref={createCategoryRef}
          header="Create Category"
          type="Category"
        />
        <CreateGroupDialog
          editMode
          editKey={data.key}
          onCategory={openCategoryHandler}
          onClose={() => {
            setEditMode(false);
          }}
          ref={editDialogRef}
        />
      </>
    );
  }

  return (
    <>
      {editMode && <EditDialog />}
      <Link to={`/Quizback/list?id=${data.key}`}>
        <Card
          className={`flex flex-col cursor-pointer hover:drop-shadow-lg transition-transform active:bg-neutral-50 relative py-3 pl-5 min-w-[300px] w-full dark:bg-neutral-800 hover:-translate-y-1 animate-fade-up-bounce`}
          {...props}>
          <span
            style={{backgroundColor: `${data.sideColor}`}}
            className="absolute inset-y-0 left-0 w-1 rounded-full"
          />
          <h2 className="text-4xl font-semibold text-left w-fit">
            {utilCtx.truncateString(data.name, 9)}
          </h2>
          {dataCtx.showGroupDates === "true" && (
            <div>
              <p className="text-base opacity-80">Date Modified: {data.dateModified}</p>
              <p className="text-base opacity-80">Date Added: {data.dateCreated}</p>
            </div>
          )}

          <button
            className="absolute z-10 right-2 top-2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSettingVisibility(true);
            }}>
            <span className="material-symbols-outlined">settings</span>
          </button>
          <Card
            ref={settingRef}
            className="absolute right-2 top-1 h-fit z-50 drop-shadow-2xl flex flex-col !p-0 overflow-hidden transition-all opacity-0 pointer-events-none">
            <Button
              className="!drop-shadow-none flex-1 flex justify-center mt-2"
              onClick={(e) => {
                e.preventDefault();
                setEditMode(true);
              }}>
              <span className="material-symbols-outlined">edit</span>
              edit
            </Button>
            <Button
              className="!drop-shadow-none flex-1 flex justify-center mb-2"
              onClick={(e) => {
                e.preventDefault();
                onOpenDeleteDialog(data.name, data.key);
              }}>
              <span className="material-symbols-outlined">delete</span>
              delete
            </Button>
          </Card>
        </Card>
      </Link>
    </>
  );
}
