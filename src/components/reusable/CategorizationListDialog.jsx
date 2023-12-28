import {forwardRef} from "react";
import Dialog from "./Dialog";
import Card from "./Card";
import Button from "./Button";
import CategorizationElement from "./CategorizationElement";

export default forwardRef(function CategorizationListDialog({header, type}, ref) {
  return (
    <Dialog ref={ref} header={header}>
      <Card className="w-full flex flex-col !bg-neutral-400 dark:bg-neutral-900 h-[50vh] max-h-[250px] overflow-auto">
        <CategorizationElement />
        <CategorizationElement />
        <CategorizationElement />
        <CategorizationElement />
        <CategorizationElement />
        <CategorizationElement />
        <CategorizationElement />
        <CategorizationElement />
      </Card>
    </Dialog>
  );
});
