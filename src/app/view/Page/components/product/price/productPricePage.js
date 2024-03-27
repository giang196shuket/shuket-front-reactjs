
import { useState } from 'react';
import {ProductPriceCart, ProductPriceUIProvider, injectIntl } from './index'
import { ProductEditPrice } from './helper/productEditPrice';

function ProductPricePage(props) {
  const [editPrice, setEditPrice ] = useState(null)
  const UIEvents = {

    openEdit: (id) => {
      setEditPrice(id)
    },
    openDelete: (id) => {
     console.log(id)
    },

  };
  return (
    <>
     <ProductEditPrice openId={editPrice} close={()=>setEditPrice(null)}/>

      <ProductPriceUIProvider UIEvents={UIEvents}>
      <ProductPriceCart />
    </ProductPriceUIProvider>
    </>

   
  );
}

export default injectIntl(ProductPricePage);
