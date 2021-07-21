import { useEffect, useState } from 'react';
import qs from 'query-string';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import SearchResult from '../components/search/SearchResult'
import Subscription from '../components/Subscription';
import Loading from '../components/Loading';

import { useSelector, useDispatch } from 'react-redux';
import { AJAX_STATUES_SUCCESS } from '../features/fetchStatus';
import { fetchHotels } from '../features/hotelSlicer';

function SearchPage (props){

  const query = useSelector(state => state.search);
  const queryBackup = qs.parse(props.location.search);

  const hotels = useSelector(state => state.hotel.hotels);
  const status = useSelector(state => state.hotel.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotels(query));
  }, [])

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={false} simplified={false}/>
      </Layout.Header>
      <Layout.Content>
        {
          status === AJAX_STATUES_SUCCESS ?
          <SearchResult hotelData={hotels} query={queryBackup} /> :
          <Loading />
        }
        <Subscription size="small" />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default SearchPage;