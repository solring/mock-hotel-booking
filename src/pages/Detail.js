import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import RoomDetail from '../components/RoomDetail';
import Subscription from '../components/Subscription';

import api, { GetHotelInfo } from '../api/mockApi';

function DetailPage (props){

  const defaultInfo = {
    name: "",
    star: 0,
    review: 0,
    addr: "",
    desc: "",
  };
  const [hotelInfo, setHotelInfo] = useState(null);
  const [hotelPics, setHotelPics] = useState([]);

  let info = (hotelInfo === null) ? defaultInfo : hotelInfo;

  // Init
  useEffect(() => {
    if (hotelInfo!==null) return;
    api(GetHotelInfo('fakeId')).then((r) => {
      setHotelInfo(r.info);
      setHotelPics(r.imgs);
    }).catch(() => {
      console.log("failed to load hotel intro.");
    });
  });

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={true} simplified={false} />
      </Layout.Header>
      <Layout.Content>
        <RoomDetail hotelInfo={info} hotelPics={hotelPics} />
        <Subscription size="small" />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default DetailPage;