import CardsPanel from '../src/components/CardsPanel/CardsPanel'

import Layout from '../src/components/Layout/Layout'

export default function Home() {
  return (
    <Layout>
      <CardsPanel type={'recent'} />
    </Layout>
  )
}
