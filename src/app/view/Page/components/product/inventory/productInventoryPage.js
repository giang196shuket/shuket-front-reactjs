
import { useState } from 'react';
import {ProductInventoryCart, ProductInventoryUIProvider, injectIntl } from './index'
import { ProductEditStock } from './helper/productEditStock';

function ProductInventoryPage(props) {
  const [editStock, setEditStock ] = useState(false)

  const UIEvents = {

    openEditStock: () => {
      setEditStock(true)
     
    },
  };
  return (
    <>
     <ProductEditStock open={editStock} close={()=>setEditStock(false)}/>

      <ProductInventoryUIProvider UIEvents={UIEvents}>
      <ProductInventoryCart />
    </ProductInventoryUIProvider>
    </>

   
  );
}

export default injectIntl(ProductInventoryPage);
