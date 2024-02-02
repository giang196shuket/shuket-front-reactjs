import { Card, CardBody, CardHeader, CardHeaderToolbar, ImagesFilter, ImagesGrouping, ImagesTable, injectIntl, useImagesUIContext, useMemo } from './index'


function ImagesCard(props, history) {
  const { intl } = props;

  const UIContext = useImagesUIContext();
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
            New Images
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ImagesFilter />
        {UIProps.ids.length > 0 && (
          <>
            <ImagesGrouping />
          </>
        )}
        <ImagesTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(ImagesCard);
