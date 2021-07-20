import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import RoomDetail from '../components/RoomDetail';
import Subscription from '../components/Subscription';
import Loading from '../components/Loading';

import { useSelector, useDispatch } from 'react-redux'
import { reset, fetchHotelDetail } from '../features/detail/detailSlicer';
import { SLICER_INIT, AJAX_STATUES_SUCCESS } from '../features/fetchStatus';

function DetailPage (props){

  const hotelInfo = useSelector(state => state.detail.detail);
  const hotelPics = useSelector(state => state.detail.images);
  const status = useSelector(state => state.detail.status);
  const dispatch = useDispatch();


  // Init
  useEffect(() => {
    if(status === SLICER_INIT)
      dispatch(fetchHotelDetail("fakeId"));
    //return () => dispatch(reset());
  });

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={true} simplified={false} />
      </Layout.Header>
      <Layout.Content>
        { status === AJAX_STATUES_SUCCESS ?
        <RoomDetail hotelInfo={hotelInfo} hotelPics={hotelPics} /> :
        <Loading />
        }
        <Subscription size="small" />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default DetailPage;