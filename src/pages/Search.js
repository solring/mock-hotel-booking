import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import SearchResult from '../components/SearchResult'
import Subscription from '../components/Subscription';

import { useSelector } from 'react-redux';
import api, { Search } from '../api/mockApi';

function SearchPage (props){

  const [hotelData, setHotelData] = useState([]);
  const query = useSelector(state => state.search);

  useEffect(() => {
    if(hotelData.length > 0) return;
    api(Search(query)).then((res) => {
      setHotelData(res.data);
    }).catch((e) => {
      console.error("No hotel data");
    });
  })

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={false} simplified={false}/>
      </Layout.Header>
      <Layout.Content>
        <SearchResult hotelData={hotelData}/>
        <Subscription size="small" />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default SearchPage;