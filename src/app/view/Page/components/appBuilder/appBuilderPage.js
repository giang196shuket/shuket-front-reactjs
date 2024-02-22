import { Card, CardBody, CardHeader, OverlayTrigger, SVG, Tooltip, getScreenBuilder, toAbsoluteUrl, useDispatch, useEffect, useState } from './index'


export const AppBuilderPage = (props) => {
  const dispatch = useDispatch();
  const [mainScreen, setMainScreen] = useState([]);
  const [subScreen, setSubScreen] = useState([]);

  useEffect(() => {
    dispatch(getScreenBuilder())
      .unwrap()
      .then((res) => {
        if (res.code === 200 && res.status === "success") {
          console.log("res", res);
          setMainScreen(res.data.ms_list_data);
          setSubScreen(res.data.ss_list_data);
        }
      })
      .catch((err) => {});
  }, []);

  const openEdit = (scCode) => {
    props.history.push("/m-shuket/MARTS/app-management/app-builder/" + scCode);
  };
  return (
    <Card>
      <CardHeader title={"APP DISPLAY MANAGEMENT"}></CardHeader>
      <CardBody>
        <Card>
          <CardHeader title={"MAIN SCREEN"}></CardHeader>

          <CardBody style={{ display: "flex", flexWrap: "wrap" }}>
            {mainScreen.map((main) => {
              return (
                <Card style={{ width: 335, margin: 5 }}>
                  <CardHeader title={main.sc_label}></CardHeader>
                  <CardBody>
                    <p style={{ textAlign: "center" }}>{main.sc_code}</p>
                    <p style={{ textAlign: "center" }}>
                      Number of template: {main.sc_count}
                    </p>
                    <div className="d-flex flex-row justify-content-center  align-items-center mt-5">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="products-edit-tooltip">
                            Edit Template
                          </Tooltip>
                        }
                      >
                        <a
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                          onClick={() => openEdit(main.sc_code)}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/Communication/Write.svg"
                              )}
                            />
                          </span>
                        </a>
                      </OverlayTrigger>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title={"SUB SCREEN"}></CardHeader>

          <CardBody style={{ display: "flex", flexWrap: "wrap" }}>
            {subScreen.map((sub) => {
              return (
                <Card style={{ width: 335, margin: 5 }}>
                  <CardHeader title={sub.sc_label}></CardHeader>
                  <CardBody>
                    <p style={{ textAlign: "center" }}>{sub.sc_code}</p>
                    <p style={{ textAlign: "center" }}>
                      Number of template: {sub.sc_count}
                    </p>
                    <div className="d-flex flex-row justify-content-center  align-items-center mt-5">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="products-edit-tooltip">
                            Edit Template
                          </Tooltip>
                        }
                      >
                        <a
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                          onClick={() => openEdit(sub.sc_code)}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/Communication/Write.svg"
                              )}
                            />
                          </span>
                        </a>
                      </OverlayTrigger>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
};
