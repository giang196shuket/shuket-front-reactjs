
import { useState } from 'react';
import {Button, Modal, ProductRegisterCart, ProductRegisterUIProvider, injectIntl } from './index'
import { ProductEditMaxmin } from './helper/productEditMaxmin';
import { ProductEditStock } from './helper/productEditStock';

function ProductRegisterPage(props) {
  const [editMaxMin, setEditMaxMin ] = useState(false)
  const [editStock, setEditStock ] = useState(false)
  const [editCate, setEditCate ] = useState(false)

  const UIEvents = {

    openEditMaxMin: () => {
      setEditMaxMin(true)
     
    },
    openEditStock: () => {
      setEditStock(true)
     
    }, openEditCate: () => {
      setEditCate(true)
     
    },

  };
  return (
    <>
     <ProductEditMaxmin open={editMaxMin} close={()=>setEditMaxMin(false)}/>
     <ProductEditStock open={editStock} close={()=>setEditStock(false)}/>

      <ProductRegisterUIProvider UIEvents={UIEvents}>
      <ProductRegisterCart />
    </ProductRegisterUIProvider>
    </>

   
  );
}

export default injectIntl(ProductRegisterPage);
