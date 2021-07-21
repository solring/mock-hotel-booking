import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import RoomDetail from '../components/detail/RoomDetail';
import HotelDesc from '../components/detail/HotelDesc';
import Subscription from '../components/Subscription';
import Loading from '../components/Loading';

import { useSelector, useDispatch } from 'react-redux'
import { fetchHotelDetail } from '../features/detail/detailSlicer';
import { fetchHotelRooms } from '../features/detail/roomSlicer';
import { SLICER_INIT, AJAX_STATUES_SUCCESS } from '../features/fetchStatus';

function DetailPage (props){

  const hotelInfo = useSelector(state => state.detail.detail);
  const hotelPics = useSelector(state => state.detail.images);
  const rooms = useSelector(state => state.room.rooms);
  const status = useSelector(state => state.detail.status);
  const status2 = useSelector(state => state.room.status);
  const dispatch = useDispatch();

  let loaded = status === AJAX_STATUES_SUCCESS;
  // Init
  useEffect(() => {
    dispatch(fetchHotelDetail("fakeId"));
    dispatch(fetchHotelRooms("fakeId"));
  },[]);

  const Content = () => (
    <div className="pt-md-4 Hotel__pageContainer">
      {
         loaded ?
        <HotelDesc hotelInfo={hotelInfo} hotelPics={hotelPics} /> :
        <Loading />
      }
      { rooms.length > 0 && <RoomDetail hotelInfo={hotelInfo} availableRooms={rooms} />}
    </div>
  );

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={true} simplified={false} />
      </Layout.Header>
      <Layout.Content>
        {Content()}
        <Subscription size="small" />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default DetailPage;