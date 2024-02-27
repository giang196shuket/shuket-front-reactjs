import { ActionsColumnFormatter, SwitchesCustom, BootstrapTable, NoRecordsFoundMessage, Pagination, PaginationProvider, PleaseWaitMessage, defaultSorted, getHandlerTableChange, getImageBannerCoupon, getSelectRow, injectIntl, paginationFactory, shallowEqual, sizePerPageList, sortCaret, useDispatch, useEffect, useBannerCouponUIContext, useMemo, useSelector } from './index'


function BannerCouponTable(props) {
  const UIContext = useBannerCouponUIContext();

  const UIProps = useMemo(() => {
    
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openAdd: UIContext.openAdd,
      openDelete: UIContext.openDelete,
    };
  }, [UIContext]);


  const { currentState } = useSelector(
    (state) => ({ currentState: state.images }),shallowEqual  );

  const { bannerCouponImage, isLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getImageBannerCoupon(UIProps.queryParams));
  }, [dispatch, UIProps.queryParams]);

  const columns = [
    {
      dataField: "code",
      text: "STT",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      dataField: "image",
      text: "IMAGE",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "150px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <img style={{width:'100%'}}  src={row.image} alt="" />
      ),
    },

    {
      dataField: "name",
      text: "IMAGE INFO",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "typeImageEN",
      text: "IMAGE TYPE",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "categoryEn",
      text: "IMAGE CATE",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "cTime",
      text: "IMAGE CATE",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <p>{new Date(row.cTime).toLocaleString()}</p>
      ),
    },
    {
      text: "STATUS",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <SwitchesCustom
            status={row.status === "A" ? true : false}
            code={row.code}
          ></SwitchesCustom>
        </div>
      ),
    },
    {
      dataField: "method",
      text: "Methods",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openDelete: UIProps.openDelete,
        columnName: 'code'

      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );
  const paginationOptions = {
    custom: true,
    totalSize: bannerCouponImage.length,
    sizePerPageList: sizePerPageList,
    limit: UIProps.queryParams.limit,
    page: UIProps.queryParams.page,
    paginationTotalRenderer: customTotal,
  };


  return (
    < >
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={isLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={bannerCouponImage === null ? [] : bannerCouponImage}
                columns={columns}
                defaultSorted={defaultSorted}
                onTableChange={getHandlerTableChange(
                    UIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities: bannerCouponImage,
                //   ids: UIProps.ids,
                //   setIds: UIProps.setIds,
                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={bannerCouponImage} />
                <NoRecordsFoundMessage entities={bannerCouponImage} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}

export default injectIntl(BannerCouponTable);
