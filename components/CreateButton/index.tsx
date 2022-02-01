import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'
import useEthers from 'hooks/useEthers'
import useOneshot from 'hooks/useOneshot'
import { Operation } from 'types/Oneshot.types'
import {
  buildDepositParams,
  buildWithdrawParams,
  buildSwapExactTokensParams,
  encodeParams,
} from 'helpers/paramBuilders'

function CreateButton() {
  const { writeContracts, tx, oneshotAddress, web3 } = useEthers()
  const { actions } = useOneshot()

  const createOneshotMap = async () => {
    const description = 'todo, provide textfield on UI to enter description'
    const targetAddresses = actions.flatMap(action => {
      return action.contracts?.address
    })
    const functionSignatures = actions.flatMap(action => {
      return action.contracts?.functionSig
    })
    // #TODO: fix the logic here for callValues
    const callValues = actions.flatMap(action => {
      return 0
    })
    const parameters = actions.map(action => {
      switch(action.type.operation) {
        case Operation.deposit:
          return buildDepositParams({
            token: action.input.token,
            amount: action.input.quantity.toString(),
            toAddress: oneshotAddress
          })
        case Operation.withdraw:
          return buildWithdrawParams({
            token: action.input.token,
            amount: action.input.quantity.toString(),
            toAddress: oneshotAddress
          })
        case Operation.swap:
          return buildSwapExactTokensParams({
            tokenA: action.input.token,
            tokenB: action.output.token,
            amountIn: action.input.quantity.toString(),
            toAddress: oneshotAddress
          })
        default:
          return []
      }
    })
    const encodedParameters = parameters.map((parameter, index) => {
      return encodeParams(actions[index].contracts?.paramTypes, parameter, web3)
    })

    const result = tx(writeContracts.OneshotMaps.createOneshot(description, targetAddresses, functionSignatures, encodedParameters, callValues), update => {
      console.log("📡 Transaction Update:", update);
      if (update && (update.status === "confirmed" || update.status === 1)) {
        console.log(" 🍾 Transaction " + update.hash + " finished!");
        console.log(
          " ⛽️ " +
            update.gasUsed +
            "/" +
            (update.gasLimit || update.gas) +
            " @ " +
            parseFloat(update.gasPrice) / 1000000000 +
            " gwei",
        );
      }
    });
    console.log("awaiting metamask/web3 confirm result...", result);
    console.log(await result);
  }

  return (
    <Button
      size={ButtonSize.Large}
      protocolCssClass={ButtonType.Primary}
      onClick={createOneshotMap}
    >
      <div className="self-center" style={{ width: 168 }}>
        <span>CREATE</span>
      </div>
    </Button>
  )
}

export default CreateButton
