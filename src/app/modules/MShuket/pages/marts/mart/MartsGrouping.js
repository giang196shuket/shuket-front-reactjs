import { useMartsUIContext, useMemo }  from './index'


export function MartsGrouping() {
  const martsUIContext = useMartsUIContext();
  const martsUIProps = useMemo(() => {
    return {
      ids: martsUIContext.ids,
      setIds: martsUIContext.setIds,
      openDelete: martsUIContext.openDelete,
      openFetchDialog: martsUIContext.openFetchDialog,
      openUpdateStatusDialog:
        martsUIContext.openUpdateStatusDialog,
    };
  }, [martsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{martsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={martsUIProps.openDeleteProductsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={martsUIProps.openFetchProductsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={martsUIProps.openUpdateProductsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
