import { Card, CardBody, CardHeader, CardHeaderToolbar, UserLevelTable, injectIntl, useUserLevelUIContext, useMemo } from './index'

function UserLevelCard(props, history) {
  const { intl } = props;

  const UIContext = useUserLevelUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openAdd: UIContext.openAdd,
      openDelete: UIContext.openDelete,
      openEdit: UIContext.openEdit,

    };
  }, [UIContext]);


  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          id: `MART.LIST`
        },{ length: 10})}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={UIProps.openAdd}
          >
            New User Level
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <MartsFilter />
        {UIProps.ids.length > 0 && (
          <>
            <MartsGrouping />
          </>
        )} */}
        <UserLevelTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(UserLevelCard);
