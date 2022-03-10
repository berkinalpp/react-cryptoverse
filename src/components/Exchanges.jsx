import React,{useState} from 'react'
import {useGetCryptoExchangesQuery,useGetCryptosQuery,useGetCryptoDetailsQuery} from '../services/cryptoApi'
import {Table,Typography,Spin,Col,Select,Avatar} from 'antd'
import millify from 'millify'

const Exchanges = () => {

  const [coinID,setCoinID] = useState('Qwsogvtv82FCd')

  const {data:cryptoList} = useGetCryptosQuery(100)
  const {data,isFetching} = useGetCryptoExchangesQuery(coinID)
  const {data:coinData} = useGetCryptoDetailsQuery(coinID);

  const exchangesList = data?.data?.exchanges;
  const coinName =coinData?.data?.coin?.name

  console.log(exchangesList);

  const {Title,Text} = Typography;
  const {Option} = Select;


  if(isFetching) return <Spin tip="Loading..."></Spin>
  
  const columns = [
    {
      title: 'Market Name',
      dataIndex: 'name',
      render: (text,record) => {
        return(
          <a href={record.rankingUrl}>
            { <Text><strong>{record.rank}.</strong></Text> }
            {  <Avatar className="exchange-image" src={record.iconUrl} />}
            { <Text><strong>{text}</strong></Text>}
            </a>
         
          )
      }
    },
    {
      title: '24H Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Markets',
      dataIndex: 'markets',
      key: 'markets',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];
  
  const dataSource = exchangesList.map((exchange,i) => (
    {
      name: exchange.name,
      volume:millify(exchange['24hVolume']),
      price:`${millify(exchange.price)} $`,
      markets:exchange.numberOfMarkets,
      rankingUrl:exchange.coinrankingUrl,
      rank:exchange.rank,
      iconUrl:exchange.iconUrl
    }
  ) )




  return (
    <>
    <Title level={2}> {coinName} Exchange List</Title>
    <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            onChange={(value) => setCoinID(value) }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {cryptoList?.data?.coins.map((coin) => (
              <Option value={coin.uuid} key ={coin.uuid}>{coin.name}</Option>
            ))}
           
            </Select>
        </Col>
    <Table style={{marginTop:'1.5rem'}} pagination={false} dataSource = {dataSource} columns={columns}></Table>
  </>
  )
}

export default Exchanges