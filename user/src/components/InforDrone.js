import React, {useState, useEffect} from 'react';

const InforDrone = (props) => {
    const [payload, setPayload] = useState({
        firmware: '',
        type: '',
        mode: '',
        battery: {
            voltage: '',
            current: '',
            level: ''
        },
        heartbeat: '',
        armed: false,
        flagDisiableArmed: '',
        status: ''
    });

    const [alert, setAlert] = useState({
        label: '',
        conf: ''
    });

    useEffect(() => {
        setPayload(props.payload || {});
        setAlert(props.alerts || {});

    }, [props.payload, props.alerts]);

    return (
        <div>
            <div>
                <span>
                    {/* Firmware: {payload.firmware || 'N/A'} - 
                    Type: {payload.type || 'N/A'}
                    <br/> */}
                    Mode: {payload.mode || 'N/A'}
                </span>
                <br/>
                <span>
                    {/* Battery: {payload.battery?.voltage || 'N/A'} - 
                    Current: {payload.battery?.current || 'N/A'} -  */}
                    Pin: {payload.battery?.level || 'N/A'} %
                </span>
                <br/>
                <span>
                    Heartbeat: {payload.heartbeat || 'N/A'}
                </span>
                <br/>
                <span>
                    Armed: {payload.armed ? "true" : "false"}
                    <br/>
                    FlagDisiableArmed: {payload.flagDisiableArmed || 'N/A'}
                </span>
                <br/>
                <span>
                    Label: {alert.label || 'N/A'}
                    <br/>
                    Conf: {alert.conf || 'N/A'}
                </span>
                {/* <span>
                    Status: {payload.status}
                </span> */}
            </div>
        </div>
    );
}

export default InforDrone;
