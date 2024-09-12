import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { isactive } from '../../component/axios/Service';
import { useSelector } from 'react-redux';
import bookmarkimage1 from '../../../src/component/assests/bookmark-white.png';
import bookmarkimage2 from '../../../src/component/assests/bookmark.png';

export default function IsactiveModal({
  showisactive,
  handlecloseisactive,
  isactiveitem,
  handleleadsuserList,
}) {
  const leadsSelector = useSelector((state) => state.authLogin);
  const [isActiveState, setIsActiveState] = useState(isactiveitem?.isActive);

  useEffect(() => {
    if (isactiveitem) {
      setIsActiveState(isactiveitem.isActive);
    }
  }, [isactiveitem]);

  const handleIsActive = () => {
    if (!isactiveitem) return; // Ensure isactiveitem is not null/undefined
    let formdata = new FormData();
    console.log(isactiveitem, 'isactiveitem');
    formdata.append('token', leadsSelector.token);
    formdata.append('leadId', isactiveitem.leadId);

    const newIsActiveValue = isActiveState === 0 ? 1 : 0;
    formdata.append('isActive', newIsActiveValue);

    isactive(formdata).then((response) => {
      console.log('Active status updated', response);
      setIsActiveState(newIsActiveValue); 
      handleleadsuserList(); 
      handlecloseisactive()
    });
  };

  return (
    <div>
      <Modal show={showisactive} onHide={handlecloseisactive}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        
          
          { isactiveitem &&(
            <p>Are you sure you want to  {isActiveState === 1 ? "unbookmark" :"bookmark"}   this? {isactiveitem.leadName}</p>)
          }
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
