import React, { useRef } from 'react'
import { Box } from '@mui/material'
import { PanelGroup, Panel } from 'react-resizable-panels'
import RowTabs, { Row } from '../../components/common/RowTabs'

type Props = {
  row: Row
}

// Details expects a `row` prop from the parent. If none is provided we fall back
// to a small sample so the UI renders in isolation.
export const Details: React.FC<Props> = ({ row }) => {
  const ref = useRef<HTMLDivElement>(null)
  const panelGroupAutoSaveId = 'details-tab'

  return (
    <div ref={ref} className="h-full">
      <PanelGroup
        autoSaveId={panelGroupAutoSaveId}
        className="h-full contain-strict"
        direction="horizontal"
      >
        <Panel id="details-panel" className="h-full">
          <Box className="h-full">
            <RowTabs row={row} />
          </Box>
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default Details
