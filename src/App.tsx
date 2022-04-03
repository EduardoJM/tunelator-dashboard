import { PlanItem } from './components/plans/PlanItem/PlanItem'
import { PlanType } from './entities/Plan'

function App() {
  return (
    <div>
      <PlanItem
        item={{
          description: 'Para conhecer a ferramenta.',
          display_features: [
            {
              enabled: true,
              name: 'Um e-mail'
            }
          ],
          id: 1,
          monthly_price: 0,
          name: 'Gratuíto',
          plan_type: PlanType.Free,
        }}
      />
    </div>
  )
}

export default App
