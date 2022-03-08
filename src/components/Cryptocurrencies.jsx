import React, {useEffect, useState} from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Card,Row,Col,Input,Spin} from 'antd'

import {useGetCryptosQuery} from '../services/cryptoApi'


const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const {data:cryptoList,isFetching} = useGetCryptosQuery(count);
  const [cryptos,setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm,setSearchTerm] = useState('');
  console.log(cryptos)


  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);

  },[cryptoList,searchTerm])

 
  if(isFetching) return <Spin tip="Loading..."></Spin>

  return (
   <>

    {!simplified && (
      <div className="search-crypto">
      <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  
    )}

  
    <Row gutter ={[16,16]} className="crypto-card-container">
      
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl}></img>}
                hoverable
                style={{maxHeight:'92%'}}
                >
                <p>Price: {millify(currency.price)} $</p>                   
                <p>Market Cap: {millify(currency.marketCap)}</p>                   
                <p>Price: {millify(currency.change)} %</p>                   
                </Card>
                  </Link>
            </Col>
        ))}
      </Row>
   </>
  )
}

export default Cryptocurrencies