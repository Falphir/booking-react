import './Room.css';

const Room = (props) => {

    const renderTags = (tags) => {
        return tags.map((tag) => {
            return (
                <label key={tag._id}>
                    Type Room: {tag.typeRoom},
                    VIP: {tag.vip.toString()},
                    Pool: {tag.nPool},
                    Car Park: {tag.carPark.toString()},
                    BreakFast: {tag.breakfast.toString()},
                    Lunch: {tag.lunch.toString()},
                    Spa: {tag.spa.toString()},
                    Stars: {tag.nStars},
                    Single Bed: {tag.nSingleBed},
                    Double Bed: {tag.nDoubleBed}</label>
            )
        })
    }


    return (
        <li className='room'>
            <div className='room-cell room-description'>
                <label className='room-label'>Description: {props.description}</label>
            </div>

            <div className='room-cell room-nAdult'>
                <label className='room-label'>Nº Adults: {props.nAdult}</label>
            </div>

            <div className='room-cell room-nChild'>
                <label className='room-label'>Nº Children: {props.nChild}</label>
            </div>

            <div className='room-cell room-nRoom'>
                <label className='room-label'>Nº Rooms: {props.nRoom}</label>
            </div>

            <div className='room-cell room-price'>
                <label className='room-label'>Price: {props.price}</label>
            </div>


            <div className='room-cell room-tags'>
                <label className='room-label'>Tags: {renderTags(props.tags)}</label>
            </div>
        </li>
    )
}

export default Room;