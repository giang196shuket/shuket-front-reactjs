import { Card, CardBody, CardHeader, CardHeaderToolbar, NoticeAppTable, injectIntl, useNoticeAppUIContext, useMemo } from './index'

function NoticeAppCard(props, history) {
  const { intl } = props;

  const UIContext = useNoticeAppUIContext();
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
            New NoticeApp
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
        <NoticeAppTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(NoticeAppCard);
