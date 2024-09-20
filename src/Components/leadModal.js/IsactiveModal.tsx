import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { isactive } from "../../component/axios/Service";
import { useSelector } from "react-redux";
import bookmarkimage1 from "../../../src/component/assests/bookmark-white.png";
import bookmarkimage2 from "../../../src/component/assests/bookmark.png";
import { useToken } from "../../utility/hooks";
import { isactivemodalprops } from "../../@types/isactivemodalprops";

export default function IsactiveModal({
  showisactive,
  handlecloseisactive,
  isactiveitem,
  handleleadsuserList,
}: isactivemodalprops) {
  // const leadsSelector = useSelector((state) => state.authLogin);
  const token = useToken();
  const [isActiveState, setIsActiveState] = useState<number | undefined>(
    isactiveitem?.isActive
  );

  useEffect(() => {
    if (isactiveitem) {
      setIsActiveState(isactiveitem.isActive);
    }
  }, [isactiveitem]);

  const handleIsActive = () => {
    if (!isactiveitem) return;
    let formdata = new FormData();
    console.log(isactiveitem, "isactiveitem");
    formdata.append("token", token);
    formdata.append("leadId", isactiveitem.leadId.toString());

    const newIsActiveValue = isActiveState === 0 ? 1 : 0;
    formdata.append("isActive", String(newIsActiveValue));

    isactive(formdata).then((response) => {
      console.log("Active status updated", response);
      setIsActiveState(newIsActiveValue);
      handleleadsuserList();
      handlecloseisactive();
    });
  };

  return (
    <div>
      <Modal show={showisactive} onHide={handlecloseisactive}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {isactiveitem && (
            <p>
              Are you sure you want to{" "}
              {isActiveState === 1 ? "unbookmark" : "bookmark"} this?{" "}
              {isactiveitem.leadName}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlecloseisactive}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleIsActive();
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
