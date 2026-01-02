import React, { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material'

export type Row = {
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
}

type Props = {
  row: Row
  onSave?: (row: Row) => void
}

const tabStyle = { padding: 4 }

const RowTabs: React.FC<Props> = ({ row, onSave }) => {
  const [tab, setTab] = useState(0)
  const [editRow, setEditRow] = useState<Row>({ ...row })
  const [comment, setComment] = useState('')

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const handleSave = () => {
    if (onSave) onSave(editRow)
    else console.log('Saved row:', editRow)
  }

  return (
    <Paper elevation={0} className="h-full flex flex-col p-2">
      <Tabs value={tab} onChange={handleChange} aria-label="Row tabs">
        <Tab label="Edit" />
        <Tab label="Raw" />
        <Tab label="Comment" />
      </Tabs>
      <Box sx={{ flex: 1, overflow: 'auto', padding: 0 }}>
        {tab === 0 && (
          <Box sx={tabStyle}>
            <Typography variant="h6" gutterBottom>
              Edit Row ID: {row.id}
            </Typography>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={editRow.firstName ?? ''}
              onChange={(e) =>
                setEditRow({ ...editRow, firstName: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={editRow.lastName ?? ''}
              onChange={(e) =>
                setEditRow({ ...editRow, lastName: e.target.value })
              }
            />
            <TextField
              label="Age"
              fullWidth
              margin="normal"
              type="number"
              value={editRow.age ?? ''}
              onChange={(e) =>
                setEditRow({
                  ...editRow,
                  age: e.target.value === '' ? null : Number(e.target.value),
                })
              }
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={editRow.email}
              onChange={(e) =>
                setEditRow({ ...editRow, email: e.target.value })
              }
            />
            <TextField
              label="Website"
              fullWidth
              margin="normal"
              value={editRow.website}
              onChange={(e) =>
                setEditRow({ ...editRow, website: e.target.value })
              }
            />
            <TextField
              label="Profile"
              fullWidth
              margin="normal"
              value={editRow.profile ?? ''}
              onChange={(e) =>
                setEditRow({ ...editRow, profile: e.target.value })
              }
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={editRow.phone ?? ''}
              onChange={(e) =>
                setEditRow({ ...editRow, phone: e.target.value })
              }
            />
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              value={editRow.address ?? ''}
              onChange={(e) =>
                setEditRow({ ...editRow, address: e.target.value })
              }
            />
            <TextField
              label="Company"
              fullWidth
              margin="normal"
              value={editRow.company ?? ''}
              onChange={(e) =>
                setEditRow({ ...editRow, company: e.target.value })
              }
            />
            <TextField
              label="Status"
              fullWidth
              margin="normal"
              value={editRow.status ?? ''}
              onChange={(e) =>
                setEditRow({ ...editRow, status: e.target.value })
              }
            />
            <TextField
              label="Notes"
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              value={editRow.notes ?? ''}
              onChange={(e) =>
                setEditRow({ ...editRow, notes: e.target.value })
              }
            />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditRow({ ...row })}>
                Reset
              </Button>
            </Box>
          </Box>
        )}

        {tab === 1 && (
          <Box sx={tabStyle}>
            <Typography variant="h6" gutterBottom>
              Raw Data
            </Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(row, null, 2)}
            </pre>
          </Box>
        )}

        {tab === 2 && (
          <Box sx={tabStyle}>
            <Typography variant="h6" gutterBottom>
              Comment
            </Typography>
            <TextField
              label="Your comment"
              fullWidth
              multiline
              minRows={6}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={() =>
                  console.log(`Comment for row ${row.id}:`, comment)
                }
              >
                Save Comment
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default RowTabs
