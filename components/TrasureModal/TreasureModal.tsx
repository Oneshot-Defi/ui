import React from 'react'
import useEthers from 'hooks/useEthers'
import useOneshot from 'hooks/useOneshot'
import OneshotManagement from './OneshotManagement'
import OneshotMaps from './OneshotMaps'

export default function OneshotModal({ toggle }) {
  const { oneshotAddress, createdOneshotMaps } = useEthers()
  const { actualOneshotAmounts } = useOneshot()

  return (
    <div className="bg-black bg-opacity-75 h-screen w-screen text-white flex justify-center items-center fixed z-10">
      <div className="bg-darkBlue border-white border-2 rounded-lg p-5 w-1/2 h-4/5 overflow-y-scroll scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue flex flex-col px-40">
        <OneshotManagement
          toggle={toggle}
          actualOneshotAmounts={actualOneshotAmounts}
          oneshotAddress={oneshotAddress}
        />
        <OneshotMaps oneshotMaps={createdOneshotMaps} />
      </div>
    </div>
  )
}
