

import { NoticeMoaCart, NoticeMoaUIProvider, injectIntl } from './index'

function NoticeMoaPage(props) {
  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/service/sales-collection");
    },
    openEdit: (id) => {
      console.log('id', id)
      props.history.push(
        `/m-shuket/MOA SERVICE/service/NoticeMoa-management/${id}/edit`
      );
    },
  };
  return (
    <NoticeMoaUIProvider UIEvents={UIEvents}>
      <NoticeMoaCart />
    </NoticeMoaUIProvider>
  );
}

export default injectIntl(NoticeMoaPage);
