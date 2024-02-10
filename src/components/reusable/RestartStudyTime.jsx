import {useRef} from "react";
import Button from "./Button";
import RestartStudyTimeDialog from "./RestartStudyTimeDialog";
export default function RestartStudyTime() {
  const dialogRef = useRef();

  function openDialog() {
    dialogRef.current.open();
  }

  return (
    <>
      <RestartStudyTimeDialog ref={dialogRef} />
      <Button onClick={openDialog} className="after:content-['Restart_Quiz_Dates'] tooltip z-30">
        <span className="material-symbols-outlined">restart_alt</span>
      </Button>
    </>
  );
}
