import React from 'react'
import useOneshot from 'hooks/useOneshot'
import TokenAmountRow from '@components/TokenAmountRow'

function FromToOneshot() {
  const { fromOneshotAmounts, toOneshotAmounts } = useOneshot()

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className="bg-darkerBlue border-white border-2 rounded-lg overflow-y-scroll scrollbar scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue"
        style={{ width: 265, minHeight: 88, maxHeight: 144 }}
      >
        <div className="flex flex-col mt-2">
          <div className="text-offWhite text-sm text-center">From Oneshot</div>
          {fromOneshotAmounts.length ? (
            <div className="flex flex-col mb-4">
              {fromOneshotAmounts.map((amount) => {
                return (
                  <div key={amount.token} className="mt-2">
                    <TokenAmountRow amount={amount} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-white text-lg text-center mt-2">N/A</div>
          )}
        </div>
      </div>
      <div
        className="ml-16 bg-darkerBlue border-white border-2 rounded-lg overflow-y-scroll scrollbar scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue"
        style={{ width: 265, minHeight: 88, maxHeight: 144 }}
      >
        <div className="flex flex-col mt-2">
          <div className="text-offWhite text-sm text-center">To Oneshot</div>
          {toOneshotAmounts.length ? (
            <div className="flex flex-col mb-4">
              {toOneshotAmounts.map((amount) => {
                return (
                  <div key={amount.token} className="mt-2">
                    <TokenAmountRow amount={amount} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-white text-lg text-center mt-2">N/A</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FromToOneshot
