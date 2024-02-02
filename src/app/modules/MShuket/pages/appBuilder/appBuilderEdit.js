
import { AppBuilderEditDetail, AppBuilderEditTable, Card, CardBody, CardHeader, CardHeaderToolbar, CircularProgress, LinearProgress, getAppScreenDetail, useDispatch, useEffect, useState } from './index'
export const AppBuilderEdit = (props) => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    dispatch(getAppScreenDetail(props.match.params.id))
      .unwrap()
      .then((res) => {
        if (res.code === 200 && res.status === "success") {
          setDetail(res.data);
        }
      })
      .catch((err) => {});
  }, []);

  const backToMartList = () => {
    props.history.push(`/m-shuket/MARTS/app-management/app-builder`);
  };

  return (
    <Card>
      <CardHeader title={"APP SCREEN EDIT"}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToMartList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
        <div className="form-group row">
          <label className="col-form-label text-right col-lg-1 col-sm-12 ">
            Template name
          </label>
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              name="templateName"
              placeholder="Teamplate name"
              value={detail?.sc_label}
              onChange={(e) =>
                setDetail({ ...detail, sc_label: e.target.value })
              }
            />
          </div>
        </div>
        <div className="d-flex flex-row justify-content-around">
          <div style={{ width: "25%", overflowY: "scroll", height: 600 }}>
            {/* header */}
            <div className="navbar navbar-expand navbar-light bg-light">
              <b className="navbar-brand">{detail?.sc_label}</b>
              <p className="navbar-brand">배너전시</p>
              <p className="navbar-brand" style={{ marginTop: 0 }}>
                쿠폰
              </p>
            </div>
            {/* header */}

            {detail ? (
              detail?.sc_detail_data.map((dt) => {
                return <AppBuilderEditDetail detail={dt}></AppBuilderEditDetail>;
              })
            ) : (
              <CircularProgress
                style={{ display: "block", margin: "auto", marginTop: 10 }}
                color="secondary"
              />
            )}
          </div>
          <div style={{ width: "65%" }}>
            {detail ? (
              <AppBuilderEditTable
                detail={detail}
                handleDragEndCallback={(e) =>
                  setDetail({ ...detail, sc_detail_data: e })
                }
              ></AppBuilderEditTable>
            ) : (
              <LinearProgress color="secondary" />
            )}

            {detail ? (
              <button
                type="button"
                className="btn btn-primary"
                style={{ display: "block", margin: "0 auto", marginTop: 50 }}
              >
                SAVE
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-light"
                disabled
                style={{ display: "block", margin: "0 auto", marginTop: 50 }}
              >
                SAVE
              </button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
