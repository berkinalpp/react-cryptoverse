import React, {useState} from "react";
import {Select, Typography, Row, Col, Avatar, Card, Spin} from "antd";
import moment from "moment";

import {useGetCryptoNewsQuery} from "../services/cryptoNewsApi";
import {useGetCryptosQuery} from '../services/cryptoApi'

const {Title, Text} = Typography;
const {Option} = Select;
const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState("Crypto");
  const {data:cryptoList} = useGetCryptosQuery(100)
  const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const demoImage =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

    if(isFetching) return <Spin tip="Loading..."></Spin>

  return (
    <Row gutter={[16, 16]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {cryptoList?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
           
            </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card
            loading={isFetching}
            style={{maxHeight: "95%"}}
            hoverable
            className="news-card"
          >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                {news.image && (
                  <img
                    style={{maxWidth: "200px", maxHeight: "100px"}}
                    src={news?.image?.thumbnail?.contentUrl}
                    alt="news"
                  />
                )}
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    style={{height: "40px", width: "40px"}}
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  ></Avatar>
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
