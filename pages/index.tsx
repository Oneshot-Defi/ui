import NavBar from '@components/NavBar'
import FromToOneshot from '@components/FromToOneshot'
import ActionsRow from '@components/ActionsRow'
import Button, {
  ButtonSize,
  ButtonType,
  ButtonShape,
} from '@components/Button/Button'
import React from 'react'
import ActionModal from '@components/ActionModal/ActionModal'
import { useState } from 'react'
import OneshotModal from '@components/TrasureModal/OneshotModal'
import useOneshotModal from 'hooks/useOneshotModal'
import useOneshot from 'hooks/useOneshot'
import CreateButton from '@components/CreateButton'

export default function Home() {
  const [actionModalState, setActionModalState] = useState(false)
  const { isShowing, toggle } = useOneshotModal()
  const { actions } = useOneshot()

  return (
    <div className="bg-darkBlue h-screen w-screen">
      {actionModalState ? (
        <ActionModal toggleActionModal={setActionModalState} />
      ) : (
        ''
      )}
      {isShowing ? <OneshotModal toggle={toggle} /> : ''}

      <NavBar />
      <div className="flex justify-center mt-12">
        <FromToOneshot />
      </div>
      <div className="flex flex-row justify-center mt-12">
        <div
          className="flex flex-row w-5/6 items-center scrollbar scrollbar-thumb-offWhite scrollbar-track-darkerBlue pb-12"
          style={{ height: 501 }}
        >
          <ActionsRow />
          <div className="mt-14">
            <Button
              size={ButtonSize.ExtraLarge}
              protocolCssClass={ButtonType.Primary}
              buttonShape={ButtonShape.Circular}
              onClick={() => setActionModalState(true)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      {actions && actions.length && (
        <div className="flex justify-center mt-2">
          <CreateButton />
        </div>
      )}
    </div>
  )
}
