import { useState } from "react";
import { useProductNoBarcodeUIContext, useMemo, statusList, useDispatch } from "./index";
import { updateMultiStatusImgs } from "../../../redux/images/Thunk";
import { useHistory  } from "react-router-dom";

export function ProductNoBarcodeGrouping() {
  // Products UI Context
  const UIContext = useProductNoBarcodeUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
    };
  }, [UIContext]);

  const [status, setStatus] = useState("used");
  const dispatch = useDispatch()
  const history = useHistory ();

  const handleUpdate = () =>{
    dispatch(updateMultiStatusImgs({code :UIContext.ids, status: status === 'used' ? 'A' : 'C'}))
    .then((res)=>{
      history.go(0);
    })
  }
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
              <select
                className="form-control col-lg-1"
                placeholder="Filter by Status"
                name="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
              >
                {statusList.map((statusList) => (
                  <option key={statusList.value} value={statusList.value}>
                    {statusList.text}
                  </option>
                ))}
              </select>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm col-lg-1"
                onClick={handleUpdate}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
