import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'
import useOneshotModal from 'hooks/useOneshotModal'
import useEthers from 'hooks/useEthers'

function OneshotButton() {
  const { toggle } = useOneshotModal()
  const { address, oneshotAddress, writeContracts, tx, loadOneshotAddress } = useEthers()

  const getShortenedAddress = () => {
    return `${oneshotAddress.substring(0, 6)}...${oneshotAddress.slice(-4)}`
  }

  const generateOneshot = async () => {
    const result = tx(writeContracts.PlanetFactory.createOneshotPlanet(), update => {
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
    loadOneshotAddress(writeContracts, address, tx)
  }

  return (
    <Button
      size={ButtonSize.Large}
      protocolCssClass={ButtonType.Primary}
      onClick={oneshotAddress ? toggle : generateOneshot}
    >
      <div className="flex flex-row items-center" style={{ minWidth: 168 }}>
        <div
          className="bg-no-repeat bg-center mr-4"
          style={{
            backgroundImage: 'url(/images/icons/oneshotIconPurple.png)',
            width: 42,
            height: 42,
          }}
        ></div>
        <span className="pb-1">{oneshotAddress ? getShortenedAddress() : 'GENERATE'}</span>
      </div>
    </Button>
  )
}

export default OneshotButton
