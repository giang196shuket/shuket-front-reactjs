

import { Card, CardBody, CardHeader, CardHeaderToolbar, LayoutSplashScreen, MartEditForm, getDetailMart, shallowEqual, useDispatch, useEffect, useRef, useSelector, useState, useSubheader } from './index'

export function MartEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { isLoading, martForEdit, martHQList } = useSelector(
    (state) => ({
      isLoading: state.marts.isLoading,
      martForEdit: state.marts.martForEdit,
      martHQList: state.marts.martHQList,
    }),
    shallowEqual
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDetailMart(id));
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    let _title = id ? "" : "New mart";
    if (martForEdit && id) {
      _title = `Edit mart '${martForEdit.moa_code}'`;
    }

    setTitle(_title);
  }, [martForEdit, id]);

  const saveProduct = (values) => {
    console.log("saveProduct", values);
    // if (!id) {
    //   dispatch(actions.createProduct(values)).then(() => backToProductsList());
    // } else {
    //   dispatch(actions.updateProduct(values)).then(() => backToProductsList());
    // }
  };

  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToMartList = () => {
    history.push(`/m-shuket/MOA%20SERVICE/service/sales-collection`);
  };
  return (
    <Card>
      {isLoading && <LayoutSplashScreen />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToMartList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveProductClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("basic")}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "basic").toString()}
            >
              Basic infomation
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("app-setting")}>
            <a
              className={`nav-link ${tab === "app-setting" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "app-setting").toString()}
            >
              App Push Setting
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("payment")}>
            <a
              className={`nav-link ${tab === "payment" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "payment").toString()}
            >
              Payment Method
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("delivery")}>
            <a
              className={`nav-link ${tab === "delivery" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "delivery").toString()}
            >
              Delivery Setting
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("contact")}>
            <a
              className={`nav-link ${tab === "contact" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "contact").toString()}
            >
              Contact infomation
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("subcription")}>
            <a
              className={`nav-link ${tab === "subcription" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "subcription").toString()}
            >
              Subcription
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("billing")}>
            <a
              className={`nav-link ${tab === "billing" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "billing").toString()}
            >
              Billing info
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("service")}>
            <a
              className={`nav-link ${tab === "service" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "service").toString()}
            >
              Optional service
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("balance")}>
            <a
              className={`nav-link ${tab === "balance" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "balance").toString()}
            >
              MMS balance
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("account")}>
            <a
              className={`nav-link ${tab === "account" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "account").toString()}
            >
              Account status
            </a>
          </li>
          
        </ul>
        <div className="mt-5">
          {tab === "basic" && martForEdit && (
            <MartEditForm          
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
              listHQ={martHQList || null}
            />
          )}
          {tab === "app-setting" && martForEdit && (

            <>BB</>
          )}
         
        </div>
      </CardBody>
    </Card>
  );
}
