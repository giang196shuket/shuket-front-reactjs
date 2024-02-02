import { OrderCard, OrderUIProvider, injectIntl, useSubheader }  from './index'

 function OrderPage(props ) {
  console.log('props', props)
  const { intl } = props;

  const suhbeader = useSubheader();


  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/service/sales-collection");
    },
    openEdit: (id) => {
      props.history.push(`/m-shuket/MOA SERVICE/service/sales-collection/${id}/edit`);
    },
    openDelete: (id) => {
      props.history.push(`/m-shuket//${id}/delete`);
    },
 
  };

  return (
   
    <OrderUIProvider UIEvents={UIEvents}>
      <OrderCard />
    </OrderUIProvider>
  );
}


export default injectIntl(OrderPage)