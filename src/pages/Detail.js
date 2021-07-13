import queryString from 'query-string';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import RoomDetail from '../components/RoomDetail';
import Subscription from '../components/Subscription';

function DetailPage (props){
  const query = queryString.parse(props.location.search);
  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={true} simplified={false} {...query}/>
      </Layout.Header>
      <Layout.Content>
        <RoomDetail searchOptions={query} />
        <Subscription size="small" />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default DetailPage;