import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import RoomDetail from '../components/RoomDetail';
import BottomModal from '../components/BottomModal';
import Subscription from '../components/Subscription';

function DetailPage (){
  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={true} simplified={false} />
      </Layout.Header>
      <Layout.Content>
        <RoomDetail />
        <Subscription size="small" />
        <BottomModal total={3259} roomNum={1} night={2} />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default DetailPage;