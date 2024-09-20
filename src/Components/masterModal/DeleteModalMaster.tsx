import { Modal, Button } from "react-bootstrap";
import { deletemasteruser } from "../../component/axios/Service";
import { message } from "antd";
import { useToken } from "../../utility/hooks";
export type masterdeleteprops = {
  todelete: boolean;
  handleDeleteClose: () => void;
  deleteuserid: deleteitems | null;
  apivalue: string;
  apical: () => void;
};
export type deleteitems = {
  customerCategoryId?: string;
  enquireId?: string;
  customerCategoryName?: string;
  enquireTypeName?: string;
};

export default function DeleteModalMaster({
  todelete,
  handleDeleteClose,
  deleteuserid,
  apivalue,
  apical,
}: any) {
  const token = useToken();
  console.log(token, "tokennnnn");
  const handleDeleteUser = (id: string | undefined) => {
    if (!id) return;
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("dataId", id);
    deletemasteruser(apivalue, formdata).then((response) => {
      if (response.data.status === 1) {
        message.success("deleted successfully");
        apical();
      } else {
        message.error("Deleting this category is restricted");
      }
    });
  };
  return (
    <Modal show={todelete} onHide={handleDeleteClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are You sure?
          {deleteuserid?.customerCategoryName ||
            deleteuserid?.enquireTypeName ||
            deleteuserid?.RequirementsName}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleDeleteUser(
              deleteuserid?.customerCategoryId ||
                deleteuserid?.enquireId ||
                deleteuserid?.RequirementsId
            )
          }
        >
          ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
