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
        return { ...data, tags: [{ name: data.tags }] }
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
                    {/* <input name="tags" ref={register}></input> */}

                    <label>Type Room: </label>
                    <select {...register('typeRoom')}>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Quarto">Quarto</option>
                        <option value="Casa de Férias">Casa de Férias</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Casa de Campo">Casa de Campo</option>
                    </select>

                    <label>Vip: </label>
                    <select {...register('vip')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <label>Nº Pool: </label>
                    <input {...register('nPool')}></input>

                    <label>Car Park: </label>
                    <select {...register('carPark')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <label>BreakFast: </label>
                    <select {...register('breakfast')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <label>Lunch: </label>
                    <select {...register('lunch')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <label>Spa: </label>
                    <select {...register('spa')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <label>Nº Stars: </label>
                    <select {...register('nStars')}>
                        <option value="zero">0</option>
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                        <option value="four">4</option>
                        <option value="five">5</option>
                    </select>

                    <label>Nº Single Bed: </label>
                    <input {...register('nSingleBed')}></input>

                    <label>Nº Double Bed: </label>
                    <input {...register('nDoubleBed')}></input>
                </div>


                <input className="submit" type="submit"></input>
            </form>
        </>
    );
}


export default RoomsForm;