/* eslint-disable jsx-a11y/anchor-is-valid */
import { Backdrop, CircularProgress } from "@material-ui/core";
import {
  MartEditPayment,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  LayoutSplashScreen,
  MartEditApp,
  MartEditBasic,
  getDetailMart,
  shallowEqual,
  useDispatch,
  useEffect,
  useRef,
  useSelector,
  useState,
  updateMart,
  MartEditDelivery,
  MartEditContact,
  MartEditSupcription,
  MartEditAccStatus,
  MartEditBalance,
  MartEditService,
  MartEditBilling,
  resetMartEdit
} from "./index";
import { toast } from "react-toastify";
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
      _title = `Edit mart '${martForEdit.mart_code}'`;
    }

    setTitle(_title);
  }, [martForEdit, id]);

  const saveProduct = (values) => {
    dispatch(updateMart(values))
      .then((res) => {
        if (res.payload.code === 200) {
          // history.go(0)
          // toast.success(res.payload.message);
        } else {
          toast.error(res.payload.errors);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
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
    dispatch(resetMartEdit())
    history.push(`/m-shuket/MOA%20SERVICE/service/sales-collection`);
  };
  return (
    <Card>
      {/* {isLoading && <LayoutSplashScreen />} */}

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
          <button className="btn btn-light ml-2" onClick={()=>dispatch(getDetailMart(id))}>
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
        <Backdrop sx={{ color: "#fff", zIndex: 1300 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>{" "}
        
        <div className="mt-5" style={{display: isLoading ? "none" : "block"}} >
          {tab === "basic" && martForEdit && (
            <MartEditBasic
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
              listHQ={martHQList || null}
            />
          )}
          {tab === "app-setting" && martForEdit && (
            <MartEditApp
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditApp>
          )}
          {tab === "payment" && martForEdit && (
            <MartEditPayment
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditPayment>
          )}
          {tab === "delivery" && martForEdit && (
            <MartEditDelivery
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditDelivery>
          )}
          {tab === "contact" && martForEdit && (
            <MartEditContact
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditContact>
          )}
          {tab === "subcription" && martForEdit && (
            <MartEditSupcription
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditSupcription>
          )}
          {tab === "billing" && martForEdit && (
            <MartEditBilling
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditBilling>
          )}
          {tab === "service" && martForEdit && (
            <MartEditService
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditService>
          )}
          {tab === "balance" && martForEdit && (
            <MartEditBalance
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditBalance>
          )}
          {tab === "account" && martForEdit && (
            <MartEditAccStatus
              isLoading={isLoading}
              mart={martForEdit && martForEdit}
              btnRef={btnRef}
              saveProduct={saveProduct}
            ></MartEditAccStatus>
          )}
        </div>
        
      </CardBody>
    </Card>
  );
}
