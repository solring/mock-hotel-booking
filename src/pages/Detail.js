import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import RoomDetail from '../components/RoomDetail';
import Subscription from '../components/Subscription';

import { searchOptions } from '../utils/mockdata';

function DetailPage (){
  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={true} simplified={false} />
      </Layout.Header>
      <Layout.Content>
        <RoomDetail searchOptions={searchOptions} />
        <Subscription size="small" />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default DetailPage;