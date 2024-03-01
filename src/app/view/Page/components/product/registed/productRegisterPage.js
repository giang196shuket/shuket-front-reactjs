
import {ProductRegisterCart, ProductRegisterUIProvider, injectIntl } from './index'

function ProductRegisterPage(props) {
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
    <ProductRegisterUIProvider UIEvents={UIEvents}>
      <ProductRegisterCart />
    </ProductRegisterUIProvider>
  );
}

export default injectIntl(ProductRegisterPage);
