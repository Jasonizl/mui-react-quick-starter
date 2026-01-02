import React, { useRef } from 'react'
import { Box } from '@mui/material'
import { Group, Panel, useDefaultLayout } from 'react-resizable-panels'
import RowTabs, { Row } from '../../components/common/RowTabs'

type Props = {
  row: Row
}

// Details expects a `row` prop from the parent. If none is provided we fall back
// to a small sample so the UI renders in isolation.
export const Details: React.FC<Props> = ({ row }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { defaultLayout, onLayoutChange } = useDefaultLayout({
    id: 'details-tab',
    storage: localStorage,
    panelIds: ['details-panel'],
  })

  return (
    <div ref={ref} className="h-full">
      <Group
        defaultLayout={defaultLayout}
        onLayoutChange={onLayoutChange}
        className="h-full contain-strict"
      >
        <Panel id="details-panel" className="h-full">
          <Box className="h-full">
            <RowTabs row={row} />
          </Box>
        </Panel>
      </Group>
    </div>
  )
}

export default Details
