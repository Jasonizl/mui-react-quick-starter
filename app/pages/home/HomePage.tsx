import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import Details from './Details'

type Row = {
  id: number
  firstName: string | null
  lastName: string | null
  age: number | null
  email: string
  website: string
  profile?: string | null
  phone?: string
  address?: string
  company?: string
  status?: string
  notes?: string | null
  tag?: string | null
  region?: string | null
  dept?: string | null
  role?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  score?: number | null
  level?: number | null
  remarks?: string | null
}

const columns: GridColDef<Row>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 160,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 240,
    editable: true,
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 180,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    editable: true,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 300,
    renderCell: (params) =>
      params.value ? (
        <span title={params.value as string}>
          {String(params.value).slice(0, 60)}
        </span>
      ) : null,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },

  {
    field: 'email',
    headerName: 'Email',
    width: 220,
    editable: true,
  },
  {
    field: 'website',
    headerName: 'Website',
    width: 240,
    renderCell: (params) =>
      params.value ? (
        <a href={params.value as string} target="_blank" rel="noreferrer">
          {params.value}
        </a>
      ) : null,
  },
  {
    field: 'profile',
    headerName: 'Profile',
    width: 160,
    renderCell: (params) =>
      params.value ? (
        <a href={params.value as string} target="_blank" rel="noreferrer">
          View
        </a>
      ) : null,
  },
  {
    field: 'tag',
    headerName: 'Tag',
    width: 100,
  },
  {
    field: 'region',
    headerName: 'Region',
    width: 110,
  },
  {
    field: 'dept',
    headerName: 'Department',
    width: 140,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 120,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    width: 140,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    width: 140,
  },
  {
    field: 'score',
    headerName: 'Score',
    type: 'number',
    width: 100,
  },
  {
    field: 'level',
    headerName: 'Level',
    type: 'number',
    width: 100,
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    width: 220,
  },
]

const rows = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1
  return {
    id,
    firstName: `First${id}`,
    lastName: `Last${id}`,
    age: 18 + (id % 60),
    email: `user${id}@example.com`,
    website: `https://example.com/user${id}`,
    profile: id % 7 === 0 ? null : `https://github.com/user${id}`,
    phone: `+1-555-${String(id).padStart(4, '0')}`,
    address: `${id} Main St, City ${id % 10}`,
    company: `Company ${(id % 20) + 1}`,
    status: id % 2 === 0 ? 'Active' : 'Inactive',
    notes: `Auto-generated note for user ${id}`,
    tag: `T${id}`,
    region: `R${id % 5}`,
    dept: `Dept ${id % 10}`,
    role: id % 3 === 0 ? 'Admin' : 'User',
    createdAt: `2025-01-${String((id % 28) + 1).padStart(2, '0')}`,
    updatedAt: `2025-12-${String((id % 28) + 1).padStart(2, '0')}`,
    score: id % 100,
    level: (id % 5) + 1,
    remarks: `Remark ${id}`,
  }
})

const HomePage = () => {
  const [activeRow, setActiveRow] = useState<number | null>(null)
  const showDetails = activeRow !== null

  // PanelGroup (v3) persists layout via `autoSaveId` + `storage` and emits
  // `onLayout` changes. We pass the same id/storage so behavior is preserved.
  const panelGroupAutoSaveId = 'home-page-layout'

  useEffect(() => {
    console.log('yeay')
  }, [])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <PanelGroup
        autoSaveId={panelGroupAutoSaveId}
        className="h-full"
        direction="horizontal"
      >
        <Panel
          minSize={40}
          defaultSize={70}
          id="table"
          className="flex flex-1 flex-col overflow-hidden"
          order={1}
        >
          <DataGrid
            disableMultipleRowSelection
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            pageSizeOptions={[50]}
            checkboxSelection
            onRowClick={(row) =>
              row.id === activeRow
                ? setActiveRow(null)
                : setActiveRow(row.id as number)
            }
            className="overflow-hidden h-fit"
          />
        </Panel>
        <PanelResizeHandle />
        {showDetails && (
          <Panel
            minSize={15}
            defaultSize={30}
            order={2}
            id="details"
            className="overflow-y-hidden"
          >
            <div className="h-full contain-strict bg-gray-200 p-1 flex flex-col">
              <Details key={activeRow} row={rows[activeRow]} />
            </div>
          </Panel>
        )}
      </PanelGroup>
    </div>
  )
}

export default HomePage
