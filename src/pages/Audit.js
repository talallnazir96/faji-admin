import React from "react";
import { Typography, Grid} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
const auditLogs = [
    {
        id: 1,
        timestamp: "2024-07-10T10:00:00Z",
        user: {
            id: 123,
            username: "admin_user"
        },
        action: "create",
        entity: "user",
        entityId: 456,
        changes: {
            username: {
                old: null,
                new: "new_user"
            },
            email: {
                old: null,
                new: "new_user@example.com"
            }
        }
    },
    {
        id: 2,
        timestamp: "2024-07-10T11:00:00Z",
        user: {
            id: 124,
            username: "admin_user2"
        },
        action: "update",
        entity: "user",
        entityId: 456,
        changes: {
            email: {
                old: "new_user@example.com",
                new: "updated_user@example.com"
            }
        }
    },
    {
        id: 3,
        timestamp: "2024-07-10T12:00:00Z",
        user: {
            id: 123,
            username: "admin_user"
        },
        action: "delete",
        entity: "user",
        entityId: 456,
        changes: {
            username: {
                old: "new_user",
                new: null
            },
            email: {
                old: "updated_user@example.com",
                new: null
            }
        }
    }
];

const Audit = () => {
    const columnDefs = [
        { headerName: "ID", field: "id", filter: true, floatingFilter: true },
        { headerName: "Timestamp", field: "timestamp", filter: true, floatingFilter: true },
        { headerName: "User ID", field: "user.id",  filter: true, floatingFilter: true },
        { headerName: "Username", field: "user.username" ,  filter: true, floatingFilter: true},
        { headerName: "Changes", field: "changes", 
          cellRenderer: function(params) {
              return JSON.stringify(params.value);
          }
        },
    ];

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true
    };
    return (
        <Grid container spacing={3}  sx={{marginTop: "8%", marginBottom: "2%"}}>
            <Grid item xs={10} sm={10} md={10}>
          <Typography variant='h4' style={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Audit Logs</Typography>
        </Grid>
            <Grid item xs={12} md={12}>
            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={auditLogs}
                defaultColDef={defaultColDef}
                pagination={true}
                  paginationPageSize={6}
                domLayout='autoHeight'
            />
        </div>
            </Grid>
        </Grid>
    );
}
export default Audit;