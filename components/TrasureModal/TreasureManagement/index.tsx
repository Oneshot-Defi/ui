import Button, {
  ButtonShape,
  ButtonSize,
  ButtonType,
} from '@components/Button/Button'

import OneshotModalHeader from '../OneshotModalHeader'
import OneshotAmounts from '../OneshotAmounts'

type OneshotManagementProps = {
  oneshotAddress: string
  actualOneshotAmounts
  toggle: () => void
}

export default function OneshotManagement({
  oneshotAddress,
  actualOneshotAmounts,
  toggle,
}: OneshotManagementProps) {
  return (
    <div>
      <OneshotModalHeader oneshotAddress={oneshotAddress} toggle={toggle} />
      <h3 className="text-white text-xl pb-4">TOKENS</h3>
      <OneshotAmounts actualOneshotAmounts={actualOneshotAmounts} />
      <div className="flex flex-row justify-center space-x-4">
        <Button
          size={ButtonSize.Large}
          buttonShape={ButtonShape.Wide}
          protocolCssClass={ButtonType.Primary}
          onClick={() => {}}
        >
          DEPOSIT
        </Button>
        <Button
          size={ButtonSize.Large}
          buttonShape={ButtonShape.Wide}
          protocolCssClass={ButtonType.Primary}
          onClick={() => {}}
        >
          WITHDRAW
        </Button>
      </div>
    </div>
  )
}
