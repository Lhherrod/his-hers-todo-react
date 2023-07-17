import { Dispatch, SetStateAction, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Modal = () => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");

  const dialogFuncMap: dialogFuncMapTypes = {
    displayResponsive: setDisplayResponsive,
  };

  interface dialogFuncMapTypes {
    [key: string]: Dispatch<SetStateAction<boolean>>;
  }

  const onClick = (name: string, position = null) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name: string) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name: string) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    );
  };

  return (
    <div className="dialog-demo">
      <div className="card">
        <Button
          label="Add Todo..."
          icon="pi pi-external-link"
          onClick={() => onClick("displayResponsive")}
        />
        <Dialog
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          footer={renderFooter("displayResponsive")}
        >
        </Dialog>
      </div>
    </div>
  );
};

export default Modal;