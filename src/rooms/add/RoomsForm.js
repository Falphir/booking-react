import { useForm } from "react-hook-form";
import './RoomsForm.css';
import Config from '../../config';


const RoomsForm = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => postRoom(buildRooms(data));

    const postRoom = (data) => {
        fetch('/hotel/rooms', {
            headers: { 'Content-Type': 'application/json', 'x-access-token': Config.token },
            method: 'POST',
            body: JSON.stringify(data)
        })

            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    return response.json();

                } else {
                    console.log(response);
                    alert("Room duplicate");
                }
            })

            .catch((err) => {
                console.error('error:', err);
            });
    }


    const buildRooms = (data) => {
        return {
            ...data, tags: [
                { typeRoom: data.typeRoom },
                { vip: data.vip },
                { nPool: data.nPool },
                { carPark: data.carPark },
                { breakfast: data.breakfast },
                { lunch: data.lunch },
                { spa: data.spa },
                { nStars: data.nStars },
                { nSingleBed: data.nSingleBed },
                { nDoubleBed: data.nDoubleBed }
            ]
        }
    };


    return (
        <>
            <h2>Rooms Form</h2>
            <form className="form-Rooms" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>Description: </label>
                    <input {...register('description')}></input>
                </div>

                <div className="field">
                    <label>Nº Adults: </label>
                    <input {...register('nAdult')}></input>
                </div>

                <div className="field">
                    <label>Nº Children: </label>
                    <input {...register('nChild')}></input>
                </div>

                <div className="field">
                    <label>Nº Rooms: </label>
                    <input {...register('nRoom')}></input>
                </div>

                <div className="field">
                    <label>Price: </label>
                    <input {...register('price')}></input>
                </div>

                <div className="field">
                    <label>Tags: </label>

                    <br></br>

                    <label>Type Room: </label>
                    <select {...register('typeRoom')}>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Quarto">Quarto</option>
                        <option value="Casa de Férias">Casa de Férias</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Casa de Campo">Casa de Campo</option>
                    </select>

                    <br></br>

                    <label>Vip: </label>
                    <select {...register('vip')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>Nº Pool: </label>
                    <input {...register('nPool')}></input>

                    <br></br>

                    <label>Car Park: </label>
                    <select {...register('carPark')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>BreakFast: </label>
                    <select {...register('breakfast')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>Lunch: </label>
                    <select {...register('lunch')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>Spa: </label>
                    <select {...register('spa')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <br></br>

                    <label>Nº Stars: </label>
                    <select {...register('nStars')}>
                        <option value="zero">0</option>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                        <option value="four">4</option>
                        <option value="five">5</option>
                    </select>

                    <br></br>

                    <label>Nº Single Bed: </label>
                    <input {...register('nSingleBed')}></input>

                    <br></br>

                    <label>Nº Double Bed: </label>
                    <input {...register('nDoubleBed')}></input>
                </div>


                <input className="submit" type="submit"></input>
            </form>
        </>
    );
}


export default RoomsForm;