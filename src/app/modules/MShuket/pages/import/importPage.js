import { Card, CardBody, CardHeader, getListMart, injectIntl, uploadFileImport, useDispatch, useEffect, useState } from './index'

function ImportPage(props) {
  const dispatch = useDispatch();
  const [listMart, setListMart] = useState([]);
  const [account, setAccount] = useState([]);
  const [chooseMart, setChooseMart] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getListMart())
      .unwrap()
      .then((res) => {
        if (res.code === 200 && res.status === "success") {
          setListMart(res.data.listmart);
        }
        setListMart(res.data.listmart);
        setAccount(res.data.account);
      })
      .catch((err) => {});
  }, []);

  const handleImport = () =>{
    dispatch(uploadFileImport({file: file, mart_code: chooseMart}))
    .unwrap()
      .then((res) => {
        setChooseMart(null)
        setFile(null)
      })
      .catch((err) => {});
  }

  console.log('chooseMart', chooseMart)
  return (
    <Card>
      <CardHeader title={"IMPORT PRODUCT"}></CardHeader>
      <CardBody>
        <div className="row">
          <label className="col-form-label col-lg-1 col-sm-12 ">
            Select 1 mart
          </label>
          <div className="col-lg-2">
            <select
              className="form-control"
              name="mart_common"
              value={chooseMart}
              onChange={(e) => {
                setChooseMart(e.target.value);
              }}
            >
              {listMart.map((mart, index) => (
                <option key={index} value={mart.mart_code}>
                  {mart.mart_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <label className="col-form-label  col-lg-1 col-sm-12">
            Import by account :
          </label>
          <b className="col-form-label  col-lg-1 col-sm-12">{account}</b>
        </div>
        {chooseMart ? (
          <div className="row">
            <label className="col-form-label  col-lg-1 col-sm-12">
              Upload file :
            </label>
            <input
              className="form-control form-control-sm col-lg-2 col-sm-12"
              type="file"
              accept=".csv"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
        ) : null}
        {chooseMart && file ? (
          <button onClick={handleImport} type="button" className="btn btn-primary col-form-label  mt-5">
            Import Product
          </button>
        ) : null}
      </CardBody>
    </Card>
  );
}

export default injectIntl(ImportPage);
