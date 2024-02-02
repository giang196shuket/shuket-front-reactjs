import {
  AreaCartTable,
  AreaFilter,
  AreaGrouping,
  AreaTable,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  IconButton,
  InputAdornment,
  LinearProgress,
  Modal,
  Search,
  TextField,
  addMutiAddress,
  injectIntl,
  searchAddressKakao,
  setWordKakao,
  useAreaUIContext,
  useDispatch,
  useMemo,
  useSelector,
  useState,
  setAdd
} from "./index";
function AreaCard(props, history) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const {listAreaSearch : listArea, wordSearchKakao, isAdd} = useSelector((state) => state.delivery);


  const dispatch = useDispatch();

  const UIContext = useAreaUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openAdd: UIContext.openAdd,
      openDelete: UIContext.openDelete,
      openEdit: UIContext.openEdit,
    };
  }, [UIContext]);

  console.log(UIProps)
  const handleSearch = () => {
    setLoading(true);
    dispatch(
      searchAddressKakao({
        ...UIProps.queryParams,
        address_name: wordSearchKakao,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.code === 200 && res.status === "success") {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleAdd = () => {
    const listData =
      listArea &&
      listArea.filter(
        (add) => add.id === UIProps.ids.find((id) => id === add.id)
      );
    dispatch(addMutiAddress({ list_data_full: listArea, list_data: listData }))
      .unwrap()
      .then((res) => {
        if (res.code === 200 && res.status === "success") {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <Card>
      <CardHeader
        title={intl.formatMessage(
          {
            id: `MART.LIST`,
          },
          { length: 10 }
        )}
      >
        <CardHeaderToolbar>
          <button
            style={{ marginRight: 10 }}
            type="button"
            value="kakao"
            className="btn btn-primary"
            onClick={()=>{UIProps.openAdd('kakao');UIProps.setIds([])}}
          >
            ADD KAKAO MAP
          </button>
          <button
            type="button"
            className="btn btn-primary"
            value="juso"
            onClick={()=>{UIProps.openAdd('juso');UIProps.setIds([])}}
          >
            ADD JUSO MAP
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Modal
          show={isAdd !== ''}
          onHide={() => {dispatch(setAdd("")); UIProps.setIds([])}}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Find address (Kakao Map)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField
              color="warning"
              variant="outlined"
              type={"text"}
              label="enter address word"
              fullWidth
              value={wordSearchKakao}
              onChange={(e) => dispatch(setWordKakao(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleSearch}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />{" "}
            {loading && (
              <LinearProgress
                style={{ marginTop: 5, marginBottom: 5 }}
                color="secondary"
              />
            )}
            {listArea?.length > 0 ? (
              <>
                {UIProps.ids.length > 0 && isAdd !== "" && <AreaGrouping />}

                <AreaCartTable></AreaCartTable>
              </>
            ) : (
              <p style={{ fontSize: 15 }}>
                TIP If you search address with combination listed below, you
                will get more preciese results. <br /> Road address + Building
                number <br /> ex) 판교역로 235, 제주 첨단로 242 Disctrict
                name(동/리) <br /> ex) 삼평동 681, 제주 영평동 2181 Road address
                + Building name(APT) <br /> ex) 분당 주공, 연수동 주공3차
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            {listArea?.length > 0 && (
              <Button
                style={{ display: "block", margin: "auto" }}
                onClick={handleAdd}
              >
                ADD
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <AreaFilter />
        {UIProps.ids.length > 0 && isAdd === "" && (
          <>
            <AreaGrouping />
          </>
        )}
        <AreaTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(AreaCard);
