import React, { useState } from 'react'
import { setMaxMinProduct } from '../../../../redux/product/Thunk';
import { useDispatch } from 'react-redux';
import {
    Button,
    Modal,
    Form
  } from "../index";
export const ProductMinMax = ({row}) => {
    const [MinMax, setMinMax] = useState(null);
    const dispatch = useDispatch();

    const handleSetMinMax = () => {
        dispatch(setMaxMinProduct(MinMax)).then(() => {
          setMinMax(null);
        });
      };
    
  return (
    <>
    
    <Modal show={MinMax} onHide={() => setMinMax(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Max/Min Qty
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="d-flex" controlId={MinMax?.is_pro_maxqty}>
            <Form.Label>Use maxquantity: </Form.Label>

            <Form.Check
              className="ml-5"
              value="Y"
              type="radio"
              label="Yes"
              onChange={() => setMinMax({ ...MinMax, is_pro_maxqty: "Y" })}
              checked={MinMax?.is_pro_maxqty === "Y"}
            />
            <Form.Check
              className="ml-5"
              value="N"
              type="radio"
              label="No"
              onChange={() => setMinMax({ ...MinMax, is_pro_maxqty: "N" })}
              checked={MinMax?.is_pro_maxqty === "N"}
            />
          </Form.Group>
          {MinMax?.is_pro_maxqty === "Y" && (
            <Form.Group className="d-flex" controlId={MinMax?.pro_max_qty}>
              <Form.Label>Max quantity: </Form.Label>
              <Form.Control
                type="number"
                defaultValue={MinMax?.pro_max_qty}
                onChange={(e) =>
                  setMinMax({ ...MinMax, pro_max_qty: e.target.value })
                }
              />
            </Form.Group>
          )}

          <Form.Group className="d-flex" controlId={MinMax?.is_pro_minqty}>
            <Form.Label>Use minquantity: </Form.Label>

            <Form.Check
              className="ml-5"
              value="Y"
              type="radio"
              label="Yes"
              onChange={() => setMinMax({ ...MinMax, is_pro_minqty: "Y" })}
              checked={MinMax?.is_pro_minqty === "Y"}
            />
            <Form.Check
              className="ml-5"
              value="N"
              type="radio"
              label="No"
              onChange={() => setMinMax({ ...MinMax, is_pro_minqty: "N" })}
              checked={MinMax?.is_pro_minqty === "N"}
            />
          </Form.Group>

          {MinMax?.is_pro_minqty === "Y" && (
            <Form.Group className="d-flex" controlId={MinMax?.pro_min_qty}>
              <Form.Label>Min quantity: </Form.Label>
              <Form.Control
                type="number"
                defaultValue={MinMax?.pro_min_qty}
                onChange={(e) =>
                  setMinMax({ ...MinMax, pro_min_qty: e.target.value })
                }
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ display: "block", margin: "auto" }}
            onClick={handleSetMinMax}
          >
            SET
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
    <p>
      <text style={{ color: "skyblue" }}>IS MAX:</text>{" "}
      {row.is_pro_maxqty}
    </p>
    {row.is_pro_maxqty === "Y" && (
      <p>
        {" "}
        <text style={{ color: "skyblue" }}>VALUE OF MAX:</text>{" "}
        {row.pro_max_qty}
      </p>
    )}

    <p>
      {" "}
      <text style={{ color: "skyblue" }}>IS MIN:</text>{" "}
      {row.is_pro_minqty}
    </p>
    {row.is_pro_minqty === "Y" && (
      <p>
        {" "}
        <text style={{ color: "skyblue" }}>VALUE OF MAX:</text>
        {row.pro_min_qty}
      </p>
    )}

    <button
      className="btn btn-primary mt-10"
      onClick={() =>
        setMinMax({
          is_pro_maxqty: row.is_pro_maxqty,
          pro_max_qty: row.pro_max_qty,
          is_pro_minqty: row.is_pro_minqty,
          pro_min_qty: row.pro_min_qty,
          seq: row.seq,
        })
      }
    >
      EDIT MIN/MAX QUANTITY
    </button>
  </div>
    </>
   
  )
}
