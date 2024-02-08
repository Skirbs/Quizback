import {forwardRef, useEffect, useRef, useContext} from "react";
import {DataContext} from "../../store/DataContext";
import Dialog from "./Dialog";
import Card from "./Card";
import Button from "./Button";
import FormInput from "./FormInput";
import ColorButton from "./ColorButton";
import Header from "./Header";
export default forwardRef(function CreateCategorizationDialog(
  {header, type, editMode, editKey, onClose, selectedGroup, ...props},
  ref
) {
  const dataCtx = useContext(DataContext);

  const nameRef = useRef();
  const currentColor = useRef();
  const existsWarning = useRef();
  let colorList;
  currentColor.current = currentColor.current || "black";

  // ? Use for editMode, It gets a copy of the value of nameRef before it changes
  let prevName;

  useEffect(() => {
    if (editMode) {
      if (type === "Tag") {
        const tagObj = dataCtx.getTagObjectById(editKey);
        nameRef.current.value = tagObj.name;
        changeColorManual(tagObj.sideColor);
      } else {
        const categoryObj = dataCtx.getCategoryObjectById(editKey);
        nameRef.current.value = categoryObj.name;
        changeColorManual(categoryObj.sideColor);
      }
    }
  }, []);

  useEffect(() => {
    prevName = nameRef.current.value;
  });

  function categorizationExists(c_name) {
    if (type === "Tag") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const groupIndex = dataCtx.getGroupIndexById(id);
      if (
        dataCtx.dataState.cardGroups[groupIndex].tags.findIndex((elem) => elem.name === c_name) !=
        -1
      ) {
        existsWarning.current.style.display = "block";
        existsWarning.current.style.opacity = "0.75";
        return true;
      }
      return false;
    } else {
      if (dataCtx.dataState.categories.findIndex((elem) => elem.name === c_name) != -1) {
        existsWarning.current.style.display = "block";
        existsWarning.current.style.opacity = "0.75";
        return true;
      }
      return false;
    }
  }

  function setupCloseDialog() {
    nameRef.current.value = "";
    existsWarning.current.style.opacity = "0";
    existsWarning.current.style.display = "none";
    ref.current.close();
  }
  function submitHandler(e) {
    e.preventDefault();
    if (editMode) {
      if (categorizationExists(nameRef.current.value) && nameRef.current.value != prevName) return;
      if (type === "Tag") {
        dataCtx.editTag(nameRef.current.value, currentColor.current, editKey);
      } else {
        dataCtx.editCategory(nameRef.current.value, currentColor.current, editKey);
      }
      setupCloseDialog();
      return;
    }
    if (categorizationExists(nameRef.current.value)) {
      return;
    }
    if (type === "Tag") {
      dataCtx.addTag(nameRef.current.value, currentColor.current);
    } else if (type === "Category") {
      dataCtx.addCategory(nameRef.current.value, currentColor.current);
    }
    setupCloseDialog();
  }

  function changeColorManual(color) {
    colorList = colorList || document.querySelectorAll("#categorization-color-choices *");
    for (let colorElem of colorList) {
      if (colorElem.style.backgroundColor === color) {
        colorElem.classList.add(
          "border-2",
          "border-neutral-800",
          "rounded-xl",
          "dark:border-black"
        );
        continue;
      }
      colorElem.classList.remove(
        "border-2",
        "border-neutral-800",
        "rounded-xl",
        "dark:border-black"
      );
    }
  }
  function changeColor(e) {
    e.preventDefault();
    colorList = colorList || document.querySelectorAll("#categorization-color-choices *");
    e.target.classList.add("border-2", "border-neutral-800", "rounded-xl", "dark:border-black");
    currentColor.current = e.target.style.backgroundColor;
    for (const colorElem of colorList) {
      if (colorElem.style.backgroundColor != currentColor.current) {
        colorElem.classList.remove(
          "border-2",
          "border-neutral-800",
          "rounded-xl",
          "dark:border-black"
        );
      }
    }
  }
  // ? onClose is a function for CategorizationListDialog. Used for edit mode. make sure this is executed when submitting
  return (
    <Dialog ref={ref} header={header} onClose={onClose} onSubmit={submitHandler} {...props}>
      <form className="flex flex-col gap-2">
        <Card className="!bg-neutral-300 dark:!bg-neutral-900 flex flex-col gap-1 py-2">
          <h3 className="text-sm opacity-95">Information:</h3>
          <FormInput
            inputId="group-category"
            labelTitle={`${type}:`}
            ref={nameRef}
            isRequired
            max={15}
          />
          <Card className="flex items-center flex-col !gap-0 p-1">
            <p className="self-start">Color:</p>
            <div
              id="categorization-color-choices"
              className="bg-neutral-400 dark:bg-neutral-900 p-2 rounded-md overflow-x-scroll whitespace-nowrap w-56">
              <ColorButton
                onClick={changeColor}
                className="border-2 border-neutral-800 rounded-xl dark:border-black"
                color="black"
              />
              <ColorButton onClick={changeColor} color="grey" />
              <ColorButton onClick={changeColor} color="crimson" />
              <ColorButton onClick={changeColor} color="red" />
              <ColorButton onClick={changeColor} color="darkRed" />
              <ColorButton onClick={changeColor} color="darkTurquoise" />
              <ColorButton onClick={changeColor} color="darkSlateGrey" />
              <ColorButton onClick={changeColor} color="blue" />
              <ColorButton onClick={changeColor} color="darkSlateBlue" />
              <ColorButton onClick={changeColor} color="darkOrange" />
              <ColorButton onClick={changeColor} color="yellow" />
              <ColorButton onClick={changeColor} color="gold" />
              <ColorButton onClick={changeColor} color="green" />
              <ColorButton onClick={changeColor} color="darkOrchid" />
              <ColorButton onClick={changeColor} color="lawnGreen" />
              <ColorButton onClick={changeColor} color="azure" />
              <ColorButton onClick={changeColor} color="saddleBrown" />
              <ColorButton onClick={changeColor} color="sienna" />
            </div>
          </Card>
          <p
            ref={existsWarning}
            className="text-red-900 dark:text-red-600 text-sm font-bold text-outline hidden">
            {type} Already Exists
          </p>
        </Card>

        <Button
          className="border-2 border-neutral-300 dark:!border-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-all duration-75"
          type="submit">
          {editMode ? "Edit" : "Create"}
        </Button>
      </form>
    </Dialog>
  );
});
