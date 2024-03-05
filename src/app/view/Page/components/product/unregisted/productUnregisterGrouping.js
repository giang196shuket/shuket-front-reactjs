import { useState } from "react";
import { useProductUnregisterUIContext, useMemo, useDispatch, useSelector, shallowEqual } from "./index";
import { useHistory  } from "react-router-dom";
import { registerProductMulti } from "../../../redux/product/Thunk";

export function ProductUnregisterGrouping() {
  // Products UI Context
  const UIContext = useProductUnregisterUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
    };
  }, [UIContext]);

  const dispatch = useDispatch()
  const history = useHistory ();

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );

  const {
    productUnregisterList: entities,
  } = currentState;

  const handleUpdate = () =>{
    let arrProduct = [];
    UIProps?.ids.forEach((ele) => {
      const object = entities.find((obj) => obj.id === ele);
      if (object) {
        arrProduct.push({name: object.name, code: object.code, barcode: object.barcode, images: object.images, tags: object.tags});
      }
    });
    dispatch(registerProductMulti(arrProduct))
    .then((res)=>{
      history.go(0);
    })
  }

  console.log(UIContext.ids)
  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{UIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div className="row">
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm col-lg-1"
                onClick={handleUpdate}
              >
                <i className="fa fa-plus"></i> Register multiple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
