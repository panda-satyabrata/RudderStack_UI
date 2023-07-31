import { trackingPlanService } from "../../services/TrackingPlanService"
import { useEffect, useState } from "react"

const styles = {
    body: {    
        padding: '40px',
        fontSize: '18px'
    },
    tableBody: {
        border: '1px solid black',
        borderCollapse: 'collapse',
        width: '100%',
        textAlign: 'center'
    },

    table: {
        border: '1px solid black'
    },
    header: {
        paddingBottom: '20px',
        fontWeight: '700',
        marginLeft: '30%'
    }
}

const TrackingPlanListView = () => {
    const [trackingPlanList, setTrackingPlanList] = useState(null);
    
    useEffect(() => {
        trackingPlanService.getAllTrackingPlans()
        .then((list) =>{
            setTrackingPlanList(list)
            console.log(list)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const rendetTableData = (obj, index) => {
       return( <tr>
            <td style={styles.table}>{index+1}</td>
            <td style={styles.table}>{obj.display_name}</td>
            <td style={styles.table}>{obj.rules.events.length}</td>
        </tr>)
    }

    return (
        <div style={styles.body}>
            <div style={styles.header}>
                Tracking Plan Details
            </div>
            <div>
                <table style={styles.tableBody}>
                    <thead>
                        <tr>
                            <th style={styles.table}>Sr.No.</th>
                            <th style={styles.table}>Tracking Plan Name</th>
                            <th style={styles.table}>Number of Events Associated</th>
                        </tr>
                    </thead>
                    {trackingPlanList ?
                        <tbody>
                            {trackingPlanList.map(rendetTableData)}
                        </tbody> :
                        <></>}
                </table>
            </div>
        </div>
    )
}

export default TrackingPlanListView