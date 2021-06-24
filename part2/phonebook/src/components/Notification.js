

const Notification = ({content}) => {
    let style_container = {
        width: '500px',
        height: '30px',
        backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    const style_mainText = {
        color: 'white',
        fontSize: '1.2rem',
    }
    if (content === 'Unable to update, contact no longer exists') {
        style_container = {
            width: '500px',
            height: '30px',
            backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    return(
        <div style={style_container}>
            <p style={style_mainText}>{content}</p>
        </div>
    )
}


export default Notification