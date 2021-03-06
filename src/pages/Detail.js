import { useEffect } from 'react';
import Layout from '../layout/Layout';

import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar/SearchBar';

import RoomDetail from '../components/detail/RoomDetail';
import HotelDesc from '../components/detail/HotelDesc';
import Subscription from '../components/Subscription';
import Loading from '../components/Loading';

import { useSelector, useDispatch } from 'react-redux'
import { fetchHotelDetail } from '../features/detail/detailSlicer';
import { fetchHotelRooms } from '../features/detail/roomSlicer';
import { switchFetchStatus } from '../features/fetchStatus';

function DetailPage (props){

  const hotelInfo = useSelector(state => state.detail.detail);
  const hotelPics = useSelector(state => state.detail.images);
  const rooms = useSelector(state => state.room.rooms);
  const status = useSelector(state => state.detail.status);
  const dispatch = useDispatch();

  // Init
  useEffect(() => {
    dispatch(fetchHotelDetail("fakeId"));
    dispatch(fetchHotelRooms("fakeId"));
  // eslint-disable-next-line
  },[]);

  const Content = () => (
    <div className="pt-md-4 Hotel__pageContainer">
      {switchFetchStatus(status,
        <HotelDesc hotelInfo={hotelInfo} hotelPics={hotelPics} />,
        <Loading />,
        <div className="alert alert-danger">Failed to load hotel detail. Please refresh the page.</div>)
      }
      { rooms.length > 0 && <RoomDetail hotelInfo={hotelInfo} availableRooms={rooms} />}
    </div>
  );

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} />
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