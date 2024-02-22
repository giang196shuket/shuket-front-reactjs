import { MartsCard, MartsUIProvider, getTypeMart, injectIntl, useDispatch, useEffect, useSubheader }  from './index'

 function MartsPage(props ) {
  console.log('props', props)
  const { intl } = props;

  const suhbeader = useSubheader();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getTypeMart());
    };
    fetchData().catch(console.error);
  }, []);

  // suhbeader.setTitle("Marts Management");
  // document.title = "Marts Management";

  const martsUIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/service/sales-collection");
    },
    openEdit: (id) => {
      props.history.push(`/m-shuket/MOA SERVICE/service/sales-collection/${id}/edit`);
    },
    openDelete: (id) => {
      props.history.push(`/m-shuket/marts/${id}/delete`);
    },
    // openDeleteProductsDialog: () => {
    //   history.push(`/e-commerce/products/deleteProducts`);
    // },
    // openFetchProductsDialog: () => {
    //   history.push(`/e-commerce/products/fetch`);
    // },
    // openUpdateProductsStatusDialog: () => {
    //   history.push("/e-commerce/products/updateStatus");
    // },
  };

  return (
    // <ProductsUIProvider productsUIEvents={productsUIEvents}>
    //   <ProductsLoadingDialog />
    //   <Route path="/e-commerce/products/deleteProducts">
    //     {({ history, match }) => (
    //       <ProductsDeleteDialog
    //         show={match != null}
    //         onHide={() => {
    //           history.push("/e-commerce/products");
    //         }}
    //       />
    //     )}
    //   </Route>
    //   <Route path="/e-commerce/products/:id/delete">
    //     {({ history, match }) => (
    //       <ProductDeleteDialog
    //         show={match != null}
    //         id={match && match.params.id}
    //         onHide={() => {
    //           history.push("/e-commerce/products");
    //         }}
    //       />
    //     )}
    //   </Route>
    //   <Route path="/e-commerce/products/fetch">
    //     {({ history, match }) => (
    //       <ProductsFetchDialog
    //         show={match != null}
    //         onHide={() => {
    //           history.push("/e-commerce/products");
    //         }}
    //       />
    //     )}
    //   </Route>
    //   <Route path="/e-commerce/products/updateStatus">
    //     {({ history, match }) => (
    //       <ProductsUpdateStatusDialog
    //         show={match != null}
    //         onHide={() => {
    //           history.push("/e-commerce/products");
    //         }}
    //       />
    //     )}
    //   </Route>
    //   <ProductsCard />
    // </ProductsUIProvider>
    <MartsUIProvider martsUIEvents={martsUIEvents}>
      <MartsCard />
    </MartsUIProvider>
  );
}


export default injectIntl(MartsPage)