import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Page (){
  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} />
      </Layout.Header>

      <Layout.Content>
        <section className="container">
          <h2 className="fz-title mb-4">Oops...Something is wrong...</h2>
          <h5 className="mb-5 text-secondary">Are you lost during the journey?</h5>
          <h3>The page requested does not exist. :-/</h3>
        </section>

      </Layout.Content>
      <Footer short={true} />
    </Layout>
  );
}

export default Page;