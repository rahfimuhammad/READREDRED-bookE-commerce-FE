import React from 'react'
import { formatCurrency } from '../../function/function.js';
import { DetailContainer,
         DetailImage,
         ItemContainer,
         ItemDescription } from '../../styles.js';

const Detail = (props) => {

    const value = props.data

  return (
            <DetailContainer>
              <DetailImage src={value?.product?.image}/>
              <ItemContainer>
                <ItemDescription>
                  <p><b>{value?.product?.name}</b></p>
                  <p>{formatCurrency(value?.product?.price)} × {value?.quantity}</p>
                </ItemDescription>
              </ItemContainer>
            </DetailContainer>
  )
}

export default Detail