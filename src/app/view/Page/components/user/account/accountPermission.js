import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Form,
  Modal,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getProgsRoleById } from "../../../redux/users/Thunk";
import '../../../../../../module/assets/sass/pages/users/account.scss'

const AccountPermission = (props) => {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [menu, setMenu] = useState([]);

  const toggleFirst = (id) => {
    if (id === openFirst) {
      setOpenFirst(false); 
      setOpenSecond(false);
    } else {
      setOpenFirst(id);
    }
  };
  const toggleSecond = (id) => {
    if (id === openSecond) {
      setOpenSecond(false); 
    } else {
      setOpenSecond(id); 
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (props.edit) {
      dispatch(getProgsRoleById(props.edit))
        .unwrap()
        .then((res) => {
          setMenu(res.data.left_menu);
        })
        .catch((err) => {});
    }
  }, [dispatch, props.edit]);
  console.log(menu);
  console.log("openFirst", openFirst);
  return (
    <Modal
      scrollable={true}
      show={props.edit && menu}
      onHide={() => {
        toggleFirst();
        toggleSecond();
        setMenu([]);
        props.setEdit(false);
      }}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {menu.map((main) => {
            return (
              <div className="m-5">
                <Button
                  onClick={() => toggleFirst(main.group_code)}
                  aria-controls="collapse-first"
                  size="sm"
                  aria-expanded={openFirst}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  &ensp;
                  {main.group_names.en}
                </Button>

                <Collapse in={openFirst === main.group_code}>
                  <div
                    id={`collapse-first-${main.group_code}`}
                    className={`collapse-first-${main.group_code}`}
                  >
                    {main.group_items.map((item) => {
                      return (
                        <div className="m-5">
                          <Button
                            onClick={() => toggleSecond(item.code)}
                            disabled={item.sub_items.length === 0}
                            aria-controls="collapse-second"
                            size="sm"
                            aria-expanded={openSecond}
                          >
                            {item.sub_items.length > 0 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            )}
                            &ensp;
                            {item.name.en}
                          </Button>

                          <Collapse in={openSecond === item.code}>
                            <div
                              id={`collapse-second-${item.code}`}
                              className={`collapse-second-${item.code}`}
                            >
                              {item.sub_items?.length > 0 &&
                                item.sub_items?.map((sub) => {
                                  return (
                                    <div className="m-5">
                                      <Form.Check
                                        defaultChecked={true}
                                        type={"checkbox"}
                                        id={sub.name.en}
                                        label={sub.name.en}
                                      />
                                    </div>
                                  );
                                })}
                            </div>
                          </Collapse>
                        </div>
                      );
                    })}
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ display: "block", margin: "auto" }}>SAVE</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AccountPermission;
