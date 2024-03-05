import React from 'react'

export const ProductInfo = ({row}) => {
  return (
    <div>
          <p>Product code: {row.code}</p>
          <p>Barcode: {row.barcode}</p>
          <p>Category: {row.category}</p>
          <p>Product name: {row.name}</p>
          <p>Tag: {row.tags}</p>
        </div>
  )
}
