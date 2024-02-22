
import { ProductCart, ProductUIProvider, injectIntl } from './index'

function ProductPage(props) {
  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/service/sales-collection");
    },
    openEdit: (id) => {
      console.log('id', id)
      props.history.push(
        `/m-shuket/MOA SERVICE/service/Product-management/${id}/edit`
      );
    },
  };
  return (
    <ProductUIProvider UIEvents={UIEvents}>
      <ProductCart />
    </ProductUIProvider>
  );
}

export default injectIntl(ProductPage);
