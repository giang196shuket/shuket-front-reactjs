

import { CatalogCart, CatalogUIProvider, injectIntl } from './index'

function CatalogPage(props) {
  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/service/sales-collection");
    },
    openEdit: (id) => {
      console.log('id', id)
      props.history.push(
        `/m-shuket/MOA SERVICE/service/Catalog-management/${id}/edit`
      );
    },
  };
  return (
    <CatalogUIProvider UIEvents={UIEvents}>
      <CatalogCart />
    </CatalogUIProvider>
  );
}

export default injectIntl(CatalogPage);
