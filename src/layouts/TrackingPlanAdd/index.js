import { useState, useEffect } from "react"
import { trackingPlanService } from "../../services/TrackingPlanService"

const styles = {
    body: {    
        padding: '40px',
        fontSize: '18px'
    },
    field: {
        paddingTop: '20px',
        paddingBottom: '20px',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    label: {
        width: '100px'
    },
    inputField: {
        width: '300px',
        height: '40px',
        marginRight: '40%',
        fontSize: '16px',
        paddingLeft: '12px',
        color: 'gray'
    },
    inputFieldLarge: {
        width: '300px',
        height: '120px',
        marginRight: '40%',
        fontSize: '16px',
        paddingLeft: '12px',
        color: 'gray'
    },
    button: {
        backgroundColor: '#6558f5',
        color: 'white',
        padding: '15px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '20px'
    },
    saveButton: {
        position: 'fixed',
        right: '10%',
        bottom: '10%'
    },
    header: {
        paddingBottom: '20px',
        fontWeight: '700',
        marginLeft: '30%'
    }
}

const TrackingPlanAdd = () => {
    const [name, setName] = useState("")
    const [eventName, setEventName] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventRules, setEventRules] = useState("")
    const [eventList, setEventList] = useState([])
    const [callPostAPI, setCallPostAPI] = useState(false)

    useEffect(() => {
        if (callPostAPI) {
            var jsonData = {
                "display_name": name,
                "rules": { "events": eventList }
            }
            trackingPlanService.saveTrackingDetails(jsonData)
                .then((data) =>
                    alert("Tracking Plan updated successfully.")
                )
                .catch((error) => {
                    alert("Error while updating Tracking Plan.")
                })
            setEmptyDetails()
            setName("")
            setEventList([])
            setCallPostAPI(false)
        }
      }, [eventList]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    }
    const handleEventDescriptionChange = (event) => {
        setEventDescription(event.target.value);
    }

    const handleEventRulesChange = (event) => {
        setEventRules(event.target.value);
    } 

    const renderEventDetails = (obj) => {
        return (
            <div style={styles.field}>
                <div>
                    Name: {obj.name}
                </div>
                <div>
                    Description: {obj.description}
                </div>
                <div>
                    Rules: {obj.rules}
                </div>
            </div>
        )
    }


    const renderEvent = (obj) => {
        return (
            <>
                {eventList ? <> {eventList.map(renderEventDetails)} </> : <></>}
                <div style={styles.field}>
                    <label htmlFor="eventName" style={styles.label}>Name: </label>
                    <input type="text" id="eventName" name="eventName" value={eventName} style={styles.inputField} onChange={handleEventNameChange} />
                </div>
                <div style={styles.field}>
                    <label htmlFor="eventDescription" style={styles.label}>Description: </label>
                    <input type="text" id="eventDescription" name="eventDescription" value={eventDescription} style={styles.inputField} onChange={handleEventDescriptionChange} />
                </div>
                <div style={styles.field}>
                    <label htmlFor="eventRules" style={styles.label}>Rules:</label>
                    <textarea id="eventRules" name="eventRules" value={eventRules} style={styles.inputFieldLarge} onChange={handleEventRulesChange} />
                </div>
            </>
        )
    }

    const setEmptyDetails = () => {
        setEventName("")
        setEventDescription("")
        setEventRules("")
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setCallPostAPI(true)
        setEventList([...eventList, {
            "name": eventName,
            "description": eventDescription,
            "rules": eventRules
        }])
    };

    const addEvent = (event) => {
        event.preventDefault();
        setEventList([...eventList, {
            "name": eventName,
            "description": eventDescription,
            "rules": eventRules
        }])
        setEmptyDetails()
        console.log(eventList)
    }

    return (
        <div style={styles.body}>
            <div style={styles.header}>
                Add Tracking Plan
            </div>
            <form onSubmit={handleSubmit}>
                <div style={styles.field}>
                    <label htmlFor="display_name" style={styles.label}>Name: </label>
                    <input type="text" id="display_name" name="display_name" value={name} style={styles.inputField} onChange={handleNameChange} />
                </div>
                <hr></hr>
                <div>Events</div>
                <>{renderEvent()}</>
                <div>
                    <button style={styles.button} onClick={addEvent}>+</button>
                </div>
                <div style={styles.saveButton}>
                    <button style={styles.button} type="submit">Save</button>
                </div>
            </form>
            
        </div>
    )
}

export default TrackingPlanAdd