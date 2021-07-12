import queryString from 'query-string';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

import SearchResult from '../components/SearchResult'
import Subscription from '../components/Subscription';

function SearchPage (props){
  const query = queryString.parse(props.location.search);
  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false}/>
        <SearchBar withReturn={false} simplified={false}
         {...query}
        />
      </Layout.Header>
      <Layout.Content>
        <SearchResult />
        <Subscription size="small" />
        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default SearchPage;