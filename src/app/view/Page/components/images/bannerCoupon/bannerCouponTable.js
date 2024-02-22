import { ActionsColumnFormatter, BootstrapTable, NoRecordsFoundMessage, Pagination, PaginationProvider, PleaseWaitMessage, defaultSorted, getHandlerTableChange, getImageBannerCoupon, getSelectRow, injectIntl, paginationFactory, shallowEqual, sizePerPageList, sortCaret, useDispatch, useEffect, useBannerCouponUIContext, useMemo, useSelector } from './index'


function BannerCouponTable(props) {
  const UIContext = useBannerCouponUIContext();

  const UIProps = useMemo(() => {
    
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openEdit: UIContext.openEdit,
      openDelete: UIContext.openDelete,
    };
  }, [UIContext]);


  const { currentState } = useSelector(
    (state) => ({ currentState: state.images }),shallowEqual  );

  const { bannerCouponImage, isLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getImageBannerCoupon({
      filter_status:"A",
      page:1,
      per_page:20
  
  }));
  }, [dispatch, UIProps.queryParams]);

  const columns = [
    {
      dataField: "bnr_code",
      text: "STT",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      dataField: "bnr_image",
      text: "IMAGE",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "150px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <img style={{width:'100%'}}  src={row.bnr_image} alt="" />
      ),
    },

    {
      dataField: "bnr_name",
      text: "IMAGE INFO",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "bnr_type_en",
      text: "IMAGE TYPE",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "bnr_cate_en",
      text: "IMAGE CATE",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "c_time",
      text: "IMAGE CATE",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <p>{new Date(row.c_time).toLocaleString()}</p>
      ),
    },
    
    {
      dataField: "method",
      text: "Methods",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: UIProps.openEdit,
        openDelete: UIProps.openDelete,
        columnName: 'fcm_code'

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
      ShowingA {from} to {to} of {size} Results
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
                keyField="fcm_code"
                data={bannerCouponImage === null ? [] : bannerCouponImage}
                columns={columns}
                defaultSorted={defaultSorted}
                onTableChange={getHandlerTableChange(
                    UIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities: bannerCouponImage,
                  ids: UIProps.ids,
                  setIds: UIProps.setIds,
                })}
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
