import React from 'react'
import SideBar from '../../Layouts/Sidebar'
import MaintenanceComponent from './MaintenanceComponent'
import MaintenanceTable from './MaintenanceTable'

const Income = () => {
    return (
        <>
            <div className="d-flex flex-column flex-md-row vh-100" style={{backgroundColor: "#f8f9fa"}}>
                {/* Sidebar Column */}
                <div className="col-12 col-md-3 d-flex flex-column" style={{ maxWidth: "300px" }}>
                    <SideBar />
                </div>

                {/* Main Content Column */}
                <div className="col d-flex flex-column overflow-auto">
                    <div className="container-fluid d-flex flex-column">
                        <MaintenanceComponent />
                        {/* <br/> */}
                        <MaintenanceTable />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Income
