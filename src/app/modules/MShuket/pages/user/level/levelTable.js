

import { ActionsColumnFormatter, BootstrapTable, NoRecordsFoundMessage, PleaseWaitMessage, defaultSorted, getLevelList, getHandlerTableChange, getSelectRow, injectIntl, paginationFactory, shallowEqual, sizePerPageList, sortCaret, useDispatch, useEffect, useUserLevelUIContext, useMemo, useSelector } from './index'
function UserLevelTable(props) {
  const UIContext = useUserLevelUIContext();

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
    (state) => ({ currentState: state.users }),shallowEqual  );

  const { entitiesLevel, isLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getLevelList());
  }, [dispatch, UIProps.queryParams]);

  const columns = [
    {
      dataField: "id",
      text: "STT",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      dataField: "CODE",
      text: "CODE",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      text: "NAME",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "200px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <div style={{backgroundColor:"skyblue"}}>
          <p style={{textAlign:"center", color:'white'}}>{row.NAME}</p>
        </div>
      ),
    },
   
    {
      dataField: "method",
      text: "Methods",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: UIProps.openEdit,
        openDelete: UIProps.openDelete,
        columnName: 'id'

      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "300px",
      },
    },
  ];

 

  return (
    < >
      {/* <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={isLoading}
              paginationProps={paginationProps}
            > */}
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField="fcm_code"
                data={entitiesLevel === null ? [] : entitiesLevel}
                columns={columns}
                defaultSorted={defaultSorted}
                onTableChange={getHandlerTableChange(
                    UIProps.setQueryParams
                )}
              
              >
                <PleaseWaitMessage entities={entitiesLevel} />
                <NoRecordsFoundMessage entities={entitiesLevel} />
              </BootstrapTable>
            {/* </Pagination>
          );
        }}
      </PaginationProvider> */}
    </>
  );
}

export default injectIntl(UserLevelTable);
