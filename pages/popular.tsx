import CardsPanel from '../src/components/CardsPanel/CardsPanel'
import Layout from '../src/components/Layout/Layout'

export default function Popular() {
  return (
    <Layout showPopularPanel>
      <CardsPanel type="popular" />
    </Layout>
  )
}
