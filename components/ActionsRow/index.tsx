import React from 'react'
import useOneshot from '../../hooks/useOneshot'
import ActionCard from './ActionCard'

function ActionsRow() {
  const { actions } = useOneshot()

  const computeWidth = () => {
    if (!actions.length) {
      return '47%'
    }

    const plusButtonWidth = 96
    return 295 * actions.length + plusButtonWidth
  }

  return (
    <div className="flex flex-row justify-center" style={{ minWidth: computeWidth() }}>
      {actions.map((action) => {
        return <ActionCard key={action.id} action={action} />
      })}
    </div>
  )
}

export default ActionsRow
